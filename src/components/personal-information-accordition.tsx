import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  NotificationSchema,
  PersonalInfomationValues,
} from "@/lib/validators/resume-validator";
import { useResumeBuilderContext } from "./resume-builder-context";
import { trpc } from "@/app/_trpc/client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { getNotifications } from "@/app/notyys/actions";

const PersonalInformationAccordition = () => {
  const [generation, setGeneration] = useState<NotificationSchema>();
  const [pending, startTransition] = useTransition();
  const {
    personalInfoForm: form,
    dispatch,
    resumeId,
    resume,
  } = useResumeBuilderContext();

  const { getResume } = trpc.useUtils();

  const {
    mutate: addPersonalInformation,
    isLoading,
    isError,
  } = trpc.addPersonalInformation.useMutation({
    onMutate: () => {
      toast.loading("Updating personal information");
    },
    onSuccess: () => {
      toast.success("Personal information updated");
      ``;
    },

    onSettled: () => {
      toast.dismiss();
    },
  });
  const {
    mutate: update,
    isLoading: updateLoading,
    isError: updateError,
  } = trpc.updatePersonalInformation.useMutation({
    onMutate: () => {
      toast.loading("Updating personal information");
    },
    onSuccess: () => {
      toast.success("Personal information updated");

      getResume.invalidate();

      ``;
    },
    onSettled: () => {
      toast.dismiss();
    },
  });
  const onSubmit = (data: PersonalInfomationValues) => {
    addPersonalInformation({
      resume: data,
      resumeId: resumeId,
    });
  };
  const onUpdate = (data: PersonalInfomationValues) => {
    update({
      resume: {
        ...data,
      },
      resumeId: resumeId,
    });
  };
  const updateProfileInContext = () => {
    const currentProfile = form.getValues().resume.profile;
    dispatch({
      type: "ADD_PERSONAL_INFORMATION",
      payload: {
        resume: {
          ...form.getValues().resume,
          profile: currentProfile,
        },
      },
    });
    toast.success("Profile updated in context");
  };
  return (
    <Card className=" border-none shadow-none ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between gap-2 pt-3">
            <FormField
              control={form.control}
              name="resume.names.firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume.names.lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="resume.profile"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <Textarea
                    className="rounded"
                    placeholder="Enter title"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume.proffession"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Proffession</FormLabel>
                <FormControl>
                  <Input
                    className="rounded"
                    placeholder="Enter title"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume.email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded"
                    placeholder="Enter title"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-2    ">
            <FormField
              control={form.control}
              name="resume.address.city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resume.address.state"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded"
                      placeholder="Enter title"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="resume.phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    className="rounded"
                    placeholder="Enter title"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={updateProfileInContext}>lll</Button>

          {resume?.firstName ? (
            <Button
              onClick={() => onUpdate(form.getValues())}
              className="w-full"
              disabled={updateLoading}
            >
              Update
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isLoading}>
              Save
            </Button>
          )}
        </form>
      </Form>
      <Button
        onClick={async () => {
          startTransition(async () => {
            const { notifications: newNotifications } = await getNotifications(
              "Messages during the beer party."
            );
            setGeneration(newNotifications);
          });
        }}
      >
        {pending ? "Generating..." : "Generate"}
      </Button>
      <>
        {generation &&
          generation.notifications?.map((n) => (
            <Card
              onClick={() => form.setValue("resume.profile", n.message)}
              key={n.message}
            >
              {n.message}
            </Card>
          ))}
      </>
    </Card>
  );
};

export default PersonalInformationAccordition;
