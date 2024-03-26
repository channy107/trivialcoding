"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { Input } from "@repo/ui/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { AlertModal } from "@/components/modals/AlertModal";
import Heading from "@components/Heading";

import { deleteUser, updateUser } from "@/actions/user";
import { TSelectUser, UserRole } from "@/db/schema";
import { ADMIN_COMMON_ROUTES } from "@/routes";

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
});

type UserFormValues = z.infer<typeof formSchema>;

interface Props {
  user?: TSelectUser;
}

const UserForm = ({ user }: Props) => {
  const params = useParams<{ serviceName: string }>();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<UserFormValues>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      role: user?.role ?? UserRole.USER,
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    startTransition(() => {
      if (!user) return;
      updateUser({ id: user.id, role: data.role as UserRole })
        .then(() => {
          router.refresh();
          router.push(`${ADMIN_COMMON_ROUTES.USER}`);
          toast.success("역할 변경이 완료되었습니다.");
        })
        .catch(() => {
          toast.error("문제가 발생했습니다.");
        });
    });
  };

  const onDelete = async () => {
    startTransition(() => {
      if (!user) return;
      deleteUser(user.id)
        .then(() => {
          router.refresh();
          router.push(`${ADMIN_COMMON_ROUTES.USER}`);
          toast.success("유저 삭제를 완료했습니다.");
        })
        .catch(() => {
          toast.error("문제가 발생했습니다.");
        })
        .finally(() => {
          setOpen(false);
        });
    });
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <div className="flex items-center justify-between">
        <Heading title={"역할 변경"} />
        {user && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>역할선택</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="역할을 선택해주세요."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["user", "admin"].map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            variant={"secondary"}
            className="ml-auto mr-2"
            onClick={onCancel}
            type="button"
          >
            취소
          </Button>
          <Button disabled={isPending} className="ml-auto" type="submit">
            변경하기
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default UserForm;
