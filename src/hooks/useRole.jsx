import React from "react";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();
  //   const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/user/role/${user?.email}`
      );
      return data?.role;
    },
  });

  return { role, isRoleLoading };
};

export default useRole;
