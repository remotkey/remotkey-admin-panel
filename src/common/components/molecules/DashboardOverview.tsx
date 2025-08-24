"use client";

import {
  getDashboardStats,
  getRecentProperties,
} from "@/main/dashboard/api/actions";
import { PropertyInterface, VendorInterface } from "@/main/property/interfaces";
import { getVendors } from "@/main/vendor/api/actions";
import { useEffect, useState } from "react";
import { DashboardStats } from "./DashboardStats";
import { RecentProperties } from "./RecentProperties";
import { RecentVendors } from "./RecentVendors";
import { DashboardShimmer } from "./Shimmer/DashboardShimmer";

export const DashboardOverview = () => {
  const [stats, setStats] = useState({
    properties: 0,
    vendors: 0,
    inquiries: 0,
    checkoutRequests: 0,
  });
  const [recentProperties, setRecentProperties] = useState<PropertyInterface[]>(
    []
  );
  const [recentVendors, setRecentVendors] = useState<VendorInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsResponse = await getDashboardStats();
      if (statsResponse?.data) {
        setStats({
          properties: Number(statsResponse.data.properties) || 0,
          vendors: Number(statsResponse.data.vendors) || 0,
          inquiries: Number(statsResponse.data.inquiries) || 0,
          checkoutRequests: Number(statsResponse.data.checkoutRequests) || 0,
        });
      }

      // Fetch recent properties
      const propertiesResponse = await getRecentProperties();
      if (propertiesResponse?.data) {
        const mappedProperties = propertiesResponse.data.map((prop) => ({
          id: prop.id || "",
          name: prop.name || "",
          slug: prop.slug || "",
          thumbnail: prop.thumbnail || "",
          location: {
            lat: prop.location?.lat || 0,
            lng: prop.location?.lng || 0,
            place: prop.location?.place || "",
          },
          city: prop.city || "",
          qrCode: prop.qrCode || "",
          bookingPageLink: prop.bookingPageLink || "",
          thankYouText: prop.thankYouText || "",
          hospitals: prop.hospitals || [],
          nearByRestaurants: prop.nearByRestaurants || [],
          vendors: prop.vendors || [],
          nearByRentals: prop.nearByRentals || [],
          localTours: prop.localTours || [],
          usp: prop.usp || [],
          checkIn: {
            time: prop.checkIn?.time || "",
            period: prop.checkIn?.period || "",
          },
          checkOut: {
            time: prop.checkOut?.time || "",
            period: prop.checkOut?.period || "",
          },
          houseRules: prop.houseRules || [],
          createdAt: prop.createdAt || new Date(),
        }));
        setRecentProperties(mappedProperties);
      }

      // Fetch recent vendors
      const vendorsResponse = await getVendors({
        params: { search: "", city: "", page: "1", per_page: "100" } as any,
      });
      if (vendorsResponse?.data) {
        const mappedVendors = vendorsResponse.data.map((vendor) => ({
          _id: vendor._id || "",
          name: vendor.name || "",
          cities: (vendor.cities || []).map((city) => ({
            name: city.name || "",
            vendorLocation: {
              lat: city.vendorLocation?.lat || 0,
              lng: city.vendorLocation?.lng || 0,
            },
          })),
          description: vendor.description || "",
          website: vendor.website || "",
          contactNumber: vendor.contactNumber || "",
          email: vendor.email || "",
          createdAt: vendor.createdAt || new Date(),
        }));
        setRecentVendors(mappedVendors.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <DashboardShimmer />;
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="space-y-3">
        <DashboardStats stats={stats} />
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <RecentProperties properties={recentProperties} />
          <RecentVendors vendors={recentVendors} />
        </div>
      </div>
    </div>
  );
};
