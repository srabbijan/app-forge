import { PasswordInput } from "@/components/PasswordInput";
import { Button } from "@/components/ui/button";
import http from "@/services/http";
import useCommonStore, {
  useCurrentNumber,
  useCurrentPhoneCode,
} from "@/stores/store";
import { LoginResponse } from "@/types/apiResponse";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { type ChangeEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Text } from "../common/Text";

const GivePin = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const mobile_number = useCurrentNumber();
  const commonStore = useCommonStore();

  const phoneCode = useCurrentPhoneCode();

  const { mutate: authenticate, isPending } = useMutation({
    mutationFn: async (data: { mobile_number: string; pin: string }) => {
      const response = await http.post(
        `/login?mobile_number=${data.mobile_number}&pin=${data.pin}&country_code=${phoneCode.phone_code}`,
      );
      const responseData = response.data as LoginResponse;

      return responseData;
    },
    onSuccess: (data) => {
      if (data.code === 200 && data.user) {
        setError(null);
        commonStore.setUser(data.user);
        commonStore.setToken(data.access_token);
        void navigate("/shop");
      } else {
        setError(data.message);
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message;
      setPin("");
      setError(message ?? "Login failed! Please try again.");
    },
  });

  if (!mobile_number) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          authenticate({ mobile_number, pin });
        }}
      >
        <div className="space-y-4 mb-2">
          <Text title={"Enter PIN Number"} />
          <div className="relative">
            <input
              name="username"
              type="hidden"
              value={mobile_number}
              autoComplete="username"
            />
            <PasswordInput
              ref={(input) => {
                input?.focus();
              }}
              id="current_password"
              value={pin}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const result = e.target?.value.replace(/\D/g, "");
                setPin(result);
              }}
              autoComplete="current-password"
            />
            {error && (
              <Text title={error} variant="error" className="text-sm mt-2" />
            )}
          </div>
        </div>

        <Button type="submit" className="w-full p-6">
          {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {"Login"}
        </Button>
      </form>
    </div>
  );
};

export default GivePin;
