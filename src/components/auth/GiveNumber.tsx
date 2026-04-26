import { validatePhoneNumber } from "@/constants/currency";
import http from "@/services/http";
import useCommonStore, {
  useCurrentPhoneCode,
  useCurrentPhoneValidator,
} from "@/stores/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import InputPhoneNumber from "../InputPhoneNumber";
import { Button } from "../ui/button";
import { Form, FormField } from "../ui/form";

type CheckNumberResponse = {
  code: number;
  message: string;
  shop_type_page: boolean;
};

const formSchema = z.object({
  mobile_number: z.string().min(1, { message: "Phone number is required" }),
});

const GiveNumber = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  //   const setCurrentNumber = useAuthStore((state) => state.setCurrentNumber);
  const validator = useCurrentPhoneValidator();
  const phoneCode = useCurrentPhoneCode();
  const setIsNumberChecked = useCommonStore(
    (state) => state.setIsNumberChecked,
  );
  const setCurrentNumber = useCommonStore((state) => state.setCurrentNumber);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile_number: "",
    },
  });

  const { mutateAsync: checkNumber, isPending } = useMutation({
    mutationFn: async (mobile_number: string) => {
      const response = await http.post(
        `/number_check?mobile_number=${mobile_number}&country_code=${phoneCode.phone_code}`,
      );
      return response.data as CheckNumberResponse;
    },
  });

  async function onSubmit({ mobile_number }: z.infer<typeof formSchema>) {
    if (!validatePhoneNumber(mobile_number, new RegExp(validator))) {
      form.setError("mobile_number", { message: "Invalid phone number" });
      return;
    }

    const response = await checkNumber(mobile_number);

    if (response?.code === 200) {
      setIsNumberChecked(true);
      setCurrentNumber(mobile_number);
      return;
    } else if (response?.code === 400) {
      toast(response.message);
    } else {
      void navigate("/error");
      return;
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="mobile_number"
            render={({ field }) => (
              <InputPhoneNumber
                field={field}
                label={t("login.phoneNumber")}
                isRequired
                initialBlur={false}
              />
            )}
          />

          {/* <TurnstileWidget setTurnstileToken={setTurnstileToken} /> */}

          <Button type="submit" className="w-full p-6">
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {t("common.next")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GiveNumber;
