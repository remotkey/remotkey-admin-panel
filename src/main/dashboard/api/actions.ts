"use server";

import { getFetcher } from "@/common/fetchers";
import { ApiResponseInterface } from "@/common/interfaces";

// Define the dashboard stats data type
interface DashboardStatsData {
  properties: number;
  vendors: number;
  inquiries: number;
  checkoutRequests: number;
}

// Define the recent properties data type
interface RecentPropertiesData {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  location: {
    lat: number;
    lng: number;
    place: string;
  };
  city: string;
  qrCode: string;
  bookingPageLink: string;
  thankYouText: string;
  hospitals: any[];
  nearByRestaurants: any[];
  vendors: any[];
  nearByRentals: any[];
  localTours: any[];
  usp: any[];
  checkIn: { time: string; period: string };
  checkOut: { time: string; period: string };
  houseRules: any[];
  createdAt: Date;
}

// Get dashboard statistics
export const getDashboardStats = async (): Promise<
  ApiResponseInterface<DashboardStatsData>
> => {
  try {
    const response = await getFetcher("/dashboard/stats");
    return response;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      data: {
        properties: 0,
        vendors: 0,
        inquiries: 0,
        checkoutRequests: 0,
      },
      message: "Failed to fetch dashboard stats",
      code: 500,
    };
  }
};

// Get recent properties
export const getRecentProperties = async (): Promise<
  ApiResponseInterface<RecentPropertiesData[]>
> => {
  try {
    const response = await getFetcher("/dashboard/recent-properties");
    return response;
  } catch (error) {
    console.error("Error fetching recent properties:", error);
    return {
      data: [],
      message: "Failed to fetch recent properties",
      code: 500,
    };
  }
};
