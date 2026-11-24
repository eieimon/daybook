import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { loginUser } from "@/utils/api/authService";
import { SuccessToast, ErrorToast } from "@/components/sharedUI/toast";
import type { LoginFormValues } from "@/schema/authSchema";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setLogin = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data: LoginFormValues) => loginUser(data),
    onSuccess: async (res) => {
      SuccessToast({ message: "Login success.", id: "login-success" });

      if (res?.user) {
        const userData = res.user;
        setLogin(
          userData,
          typeof res.access_token === "string" ? res.access_token : "",
        );

        // React Query invalidate the user profile query to ensure fresh data is fetched
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });

        try {
          // Navigate to the overview page after successful login
          window.location.href = "/overview";
        } catch (navigationError) {
          console.error("Navigation failed:", navigationError);
          ErrorToast({
            message: "Login successful but navigation failed",
            id: "login-nav-error",
          });
        }
      } else {
        console.error("Login succeeded but received invalid response data");
        ErrorToast({
          message: "Login succeeded but received invalid data",
          id: "login-invalid-error",
        });
      }
    },
    onError: (error: unknown) => {
      console.error(error);
      ErrorToast({
        message: "Login failed. Please try again.",
        id: `login-error-${Date.now()}`,
      });
    },
  });
};
