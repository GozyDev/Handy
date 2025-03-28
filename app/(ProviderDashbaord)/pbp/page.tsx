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
  consumerProfile: {
    user: {
      name: string;
    };
  };
}

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const fetchBookings = async () => {
    try {
      const response = await fetch("api/provider/bookings");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBookings(data.bookings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load bookings"
      );
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
    }, 30000); // 30,000 ms = 30 seconds

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

  function getBookingID(id: string, upstatus: BookingStatus, name: string) {
    const bookingDetail = bookings.find((booking) => booking.id === id)
    if(!bookingDetail){
      alert("invalid user")
    }

    console.log(bookingDetail?.status)

    if(bookingDetail?.status === upstatus ){
      setMessage(`already ${upstatus} request`.toUpperCase())
      setTimeout(()=>{
        setMessage("")
      },1500)
      return 
    }
  updateBooking(id, upstatus, name);
  }
  async function updateBooking(
    id: string,
    upstatus: BookingStatus,
    name: string
  ) {
    setIsLoading(true);
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
  }
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
    <div className="min-h-screen bg-gray-50 px-2 py-8 md:p-8">
      {message && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg bg-purple-600 text-white shadow-lg flex items-center gap-2 animate-fade-in">
          <CheckIcon className="w-5 h-5" />
          <p className="font-medium">{message}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <header className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Booking Management
          </h1>
          <p className="text-lg text-gray-600">
            Manage client appointments and service requests
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-purple-50">
            <div className="inline-block bg-purple-100/50 p-6 rounded-2xl mb-6">
              <CalendarIcon className="h-16 w-16 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Active Bookings
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              You currently have no upcoming appointments
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="p-6 space-y-4">
                  {/* Header Section */}
                  <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {booking.consumerProfile.user.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {formatDate(booking.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusConfig(booking.status).color
                      }`}
                    >
                      {getStatusConfig(booking.status).icon}
                      {getStatusConfig(booking.status).text}
                    </span>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <div className="flex items-center bg-purple-50/30 p-3 rounded-lg">
                      <ClockIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Scheduled Time</p>
                        <p className="text-gray-800 font-medium">
                          {formatDate(booking.bookingTime)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center bg-purple-50/30 p-3 rounded-lg">
                      <MapPinIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-gray-800 font-medium">{booking.location}</p>
                      </div>
                    </div>

                    {booking.note && (
                      <div className="bg-purple-50/30 p-3 rounded-lg">
                        <div className="flex items-start">
                          <DocumentTextIcon className="w-5 h-5 text-purple-600 mr-3 mt-1" />
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Notes</p>
                            <p className="text-gray-700">{booking.note}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Services & Actions */}
                    <div className="pt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
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

                    { booking.status !== 'COMPLETED' && <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => getBookingID(booking.id, "CONFIRMED", booking.consumerProfile.user.name)}
                          className="flex-1 py-2 px-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckIcon className="w-4 h-4" />
                          Confirm
                        </button>
                        <button
                          onClick={() => getBookingID(booking.id, "CANCELLED", booking.consumerProfile.user.name)}
                          className="flex-1 py-2 px-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>}
                    </div>
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
