"use client";
import { useState, useEffect } from "react";
import { TSelectUser } from "@/db/schema";
import { getCurrentUser } from "@/actions/user";

const useCurrentUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<TSelectUser | null>();

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();

        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { isLoading, user };
};

export default useCurrentUser;
