"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  XMarkIcon,
  ClockIcon as ClockSolidIcon,
  CalendarIcon,
} from "@heroicons/react/24/solid";

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

interface Booking {
  id: string;
  status: BookingStatus;
  createdAt: string;
  bookingTime: string;
  location: string;
  note?: string;
  selectedServices: string[];
  providerProfile: {
    user: {
      name: string;
    };
  };
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/getingBookingData");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBookings(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBookings();
    }, 60000); // 30,000 ms = 30 seconds

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: BookingStatus) => {
    const config = {
      PENDING: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <ClockSolidIcon className="w-4 h-4 mr-1" />,
        text: "Pending",
      },
      CONFIRMED: {
        color: "bg-green-100 text-green-800",
        icon: <CheckIcon className="w-4 h-4 mr-1" />,
        text: "Confirmed",
      },
      CANCELLED: {
        color: "bg-red-100 text-red-800",
        icon: <XMarkIcon className="w-4 h-4 mr-1" />,
        text: "Cancelled",
      },
      COMPLETED: {
        color: "bg-blue-100 text-blue-800",
        icon: <CheckIcon className="w-4 h-4 mr-1" />,
        text: "Completed",
      },
    };
    return config[status];
  };

  const getBookingID = (id: string, updatedstatus: BookingStatus) => {
    updatedStatus(id, updatedstatus);
  };

  const updatedStatus = async (id: string, upstatus: BookingStatus) => {
    try {
      const response = await fetch("api/provider/statusupdt", {
        method: "PUT",
        body: JSON.stringify({ bookingId: id, newStatus: upstatus }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Something Went wrong");
      }

      setBookings((prevBooking) =>
        prevBooking.map((booking) =>
          booking.id === id ? { ...booking, status: upstatus } : booking
        )
      );
      setMessage(
        `You have ${upstatus} a booking request from ${name}`.toLocaleUpperCase()
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="mb-4 text-red-600">
            <XMarkIcon className="h-12 w-12 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Error loading bookings</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {message && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg bg-purple-600 text-white shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckIcon className="w-5 h-5" />
          <p className="font-medium">{message}</p>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-2 md:p-8">
        <header className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Booking Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage client appointments and service requests
          </p>
        </header>
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="inline-block bg-purple-100 p-4 rounded-full mb-4">
              <CalendarIcon className="h-12 w-12 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-600">You haven't made any bookings yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.providerProfile.user.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {formatDate(booking.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          getStatusConfig(booking.status).color
                        }`}
                      >
                        {getStatusConfig(booking.status).icon}
                        {getStatusConfig(booking.status).text}
                      </span>

                      {booking.status === "CONFIRMED" && (
                        <div
                          className={`flex items-center text-sm rounded-full justify-center w-full shadow-md py-1 px-3 text-center cursor-pointer ${
                            getStatusConfig("COMPLETED").color
                          } rounded`}
                          onClick={() => getBookingID(booking.id, "COMPLETED")}
                        >
                          {getStatusConfig("COMPLETED").icon}Complete
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex items-center bg-purple-50/30 p-3 rounded-lg">
                      <ClockIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Scheduled Time
                        </p>
                        <p className="text-gray-800 font-medium">
                          {formatDate(booking.bookingTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center bg-purple-50/30 p-3 rounded-lg">
                      <MapPinIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Location
                        </p>
                        <p className="text-gray-800 font-medium">
                          {booking.location}
                        </p>
                      </div>
                    </div>

                    {booking.note && (
                      <div className="flex items-start">
                        <DocumentTextIcon className="w-5 h-5 text-gray-400 mr-2 mt-1" />
                        <p className="text-gray-600">{booking.note}</p>
                      </div>
                    )}

                    {booking.selectedServices.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Requested Services
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {booking.selectedServices.map((service, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
