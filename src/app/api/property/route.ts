import { sanitizeFilename } from "@/common/utils";
import { connect } from "@/lib/dbConnect";
import {
  deleteFromS3,
  uploadQrToS3,
  uploadToS3,
} from "@/main/property/api/upload";
import Property from "@/model/property/Property";
import { NextRequest, NextResponse } from "next/server";

connect();

// --------------------------------------Get Properties --------------------------------------------

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const limit = parseInt(searchParams.get("per_page") || "10", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const skip = (page - 1) * limit;
  const id = searchParams.get("_id");

  let sortType = searchParams.get("sort_type");
  if (sortType === "Newest") {
    sortType = "desc";
  } else if (sortType === "Oldest") {
    sortType = "asc";
  }

  if (id) {
    const data = await Property.findById(id);
    return NextResponse.json({
      data,
      meta: {
        code: 1,
        message: "Property fetched successfully",
      },
    });
  }

  const query = search ? { name: { $regex: search, $options: "i" } } : {};

  const data = await Property.find(query)
    .sort({ createdAt: sortType === "desc" ? -1 : 1 })
    .limit(limit)
    .skip(skip);

  return NextResponse.json({
    data,
    meta: {
      code: 1,
      message: "Properties fetched successfully",
      pagination: {
        current_page: page,
        per_page: limit,
        total: await Property.countDocuments(query),
      },
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.formData();
    const file = rawBody.get("thumbnail") as File;

    const parsedData = JSON.parse(rawBody.get("data") as string);

    const {
      name,
      location,
      bookingPageLink,
      thankYouText,
      city,
      usp,
      checkIn,
      checkOut,
      houseRules,
      hospitals,
      nearByRestaurants,
      nearByRentals,
      localTours,
      vendors,
    } = parsedData;

    // Filter out empty USP and House Rules entries
    const filteredUsp = usp?.filter((item: any) => item?.value?.trim()) || [];
    const filteredHouseRules =
      houseRules?.filter((item: any) => item?.value?.trim()) || [];

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "Property name is required" },
      });
    }

    if (!city?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "City is required" },
      });
    }

    if (!bookingPageLink?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "Booking page link is required" },
      });
    }

    // -------------------------------------- Generate uniq slug --------------------------------------------
    const timestamp = Date.now();
    const slug = `${name
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/ /g, "-")
      .toLowerCase()}-${timestamp}`;

    // -------------------------------------- Create and save the property --------------------------------------------
    const newProperty = new Property({
      name: name.trim(),
      slug,
      location: location || { lat: 0, lng: 0, place: "" },
      bookingPageLink: bookingPageLink.trim(),
      thankYouText: thankYouText?.trim() || "",
      city: city.trim(),
      usp: filteredUsp,
      checkIn: checkIn || { time: "", period: "" },
      checkOut: checkOut || { time: "", period: "" },
      houseRules: filteredHouseRules,
      hospitals: hospitals || [],
      nearByRestaurants: nearByRestaurants || [],
      nearByRentals: nearByRentals || [],
      localTours: localTours || [],
      vendors: vendors || [],
    });

    const savedProperty = await newProperty.save();

    // -------------------------------------- Upload Thumbnail --------------------------------------------

    const propertyId = savedProperty._id;

    if (file && file instanceof File) {
      if (!file || !propertyId) {
        return NextResponse.json({
          meta: { code: 400, message: "File or propertyId is missing" },
        });
      }

      try {
        const fileName = sanitizeFilename(file.name);
        const uploadPath = `properties/${propertyId}/thumbnail/${propertyId}-${fileName}`;
        const thumbnailUrl = await uploadToS3(file, uploadPath);
        savedProperty.thumbnail = thumbnailUrl;
      } catch (error) {
        console.error("Error uploading to S3:", error);
        return NextResponse.json({
          meta: {
            code: 0,
            message:
              "Something Went Wrong in Uploading Thumbnail. Please try again",
          },
        });
      }
    }
    await savedProperty.save();

    // -------------------------------------- Generate QR code --------------------------------------------

    const qrCodeUrl = await uploadQrToS3({ slug, _id: propertyId });

    savedProperty.qrCode = qrCodeUrl;
    await savedProperty.save();

    return NextResponse.json({
      meta: {
        code: 1,
        message: "Property added successfully",
        qrCodeUrl,
      },
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({
      meta: {
        code: 0,
        message: "An error occurred while creating the property",
      },
    });
  }
}

// --------------------------------------Delete Single Property --------------------------------------

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const property = await Property.findById(id);
  if (property) {
    const QrPath = property?.qrCode;
    if (QrPath) {
      const path = QrPath.replace(
        "https://remotkey.sfo2.digitaloceanspaces.com/",
        ""
      );
      console.log("Deleting QR path:", path);
      await deleteFromS3(path);
    }

    const thumbnail = property?.thumbnail;
    if (thumbnail) {
      const path = thumbnail.replace(
        "https://remotkey.sfo2.digitaloceanspaces.com/",
        ""
      );
      console.log("Deleting thumbnail path:", path);
      await deleteFromS3(path);
    }
  }

  if (!property) {
    return NextResponse.json({
      meta: {
        code: 0,
        message: "Property not found",
      },
    });
  }

  await Property.findByIdAndDelete(id);

  return NextResponse.json({
    meta: {
      code: 1,
      message: "Property deleted successfully",
    },
  });
} // Adjust the import based on your folder structure

export async function PUT(request: NextRequest) {
  try {
    const rawBody = await request.formData();
    const file = rawBody.get("thumbnail") as File;
    const qrCodeGenerated = rawBody.get("qrCodeGenerated") as string;
    const parsedData = JSON.parse(rawBody.get("data") as string);

    const {
      name,
      location,
      bookingPageLink,
      thankYouText,
      city,
      usp,
      checkIn,
      checkOut,
      houseRules,
      hospitals,
      nearByRestaurants,
      nearByRentals,
      localTours,
      vendors,
    } = parsedData;

    // Filter out empty USP and House Rules entries
    const filteredUsp = usp?.filter((item: any) => item?.value?.trim()) || [];
    const filteredHouseRules =
      houseRules?.filter((item: any) => item?.value?.trim()) || [];

    // Validate required fields
    if (!name?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "Property name is required" },
      });
    }

    if (!city?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "City is required" },
      });
    }

    if (!bookingPageLink?.trim()) {
      return NextResponse.json({
        meta: { code: 400, message: "Booking page link is required" },
      });
    }

    // -------------------------------------- Find the existing property --------------------------------------------
    const existingProperty = await Property.findById(parsedData?.id);

    if (!existingProperty) {
      return NextResponse.json({
        meta: {
          code: 0,
          message: "Property not found",
        },
      });
    }

    // -------------------------------------- Generate unique slug (optional) --------------------------------------------
    const timestamp = Date.now();
    const slug = `${name
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/ /g, "-")
      .toLowerCase()}-${timestamp}`;

    // -------------------------------------- Update the property --------------------------------------------
    existingProperty.name = name.trim();
    existingProperty.slug = slug;
    existingProperty.location = location || { lat: 0, lng: 0, place: "" };
    existingProperty.bookingPageLink = bookingPageLink.trim();
    existingProperty.thankYouText = thankYouText?.trim() || "";
    existingProperty.city = city.trim();
    existingProperty.usp = filteredUsp;
    existingProperty.checkIn = checkIn || { time: "", period: "" };
    existingProperty.checkOut = checkOut || { time: "", period: "" };
    existingProperty.houseRules = filteredHouseRules;
    existingProperty.hospitals = hospitals || [];
    existingProperty.nearByRestaurants = nearByRestaurants || [];
    existingProperty.nearByRentals = nearByRentals || [];
    existingProperty.localTours = localTours || [];
    existingProperty.vendors = vendors || [];

    // -------------------------------------- Generate QR code --------------------------------------------
    if (qrCodeGenerated === "true") {
      const qrCodeUrl = await uploadQrToS3({ slug, _id: existingProperty._id });
      existingProperty.qrCode = qrCodeUrl;
    }

    // -------------------------------------- Upload Thumbnail --------------------------------------------;
    if (file && file instanceof File) {
      const propertyId = existingProperty._id;

      if (!file || !propertyId) {
        return NextResponse.json({
          meta: { code: 400, message: "File or propertyId is missing" },
        });
      }

      try {
        const fileName = sanitizeFilename(file.name);
        const filePath = `properties/${propertyId}/thumbnail/${propertyId}-${fileName}`;
        const thumbnailUrl = await uploadToS3(file, filePath);
        existingProperty.thumbnail = thumbnailUrl;
      } catch (error) {
        console.error("Error uploading to S3:", error);
        return NextResponse.json({
          meta: {
            code: 0,
            message:
              "Something Went Wrong in Uploading Thumbnail. Please try again",
          },
        });
      }
    }
    // -------------------------------------- Save the updated property --------------------------------------------
    const updatedProperty = await existingProperty.save();

    if (updatedProperty) {
      return NextResponse.json({
        meta: {
          code: 1,
          message: "Property updated successfully",
        },
      });
    } else {
      return NextResponse.json({
        meta: {
          code: 0,
          message: "Failed to update property",
        },
      });
    }
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json({
      meta: {
        code: 0,
        message: "An error occurred while updating the property",
      },
    });
  }
}
