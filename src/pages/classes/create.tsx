import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBack } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { classSchema } from "@/lib/schema";
import type * as z from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UploadWidget from "@/components/upload-widget";
import type { UploadWidgetValue } from "@/types";

const ClassCreate = () => {
  const back = useBack();

  const form = useForm<z.input<typeof classSchema>, unknown, z.output<typeof classSchema>>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      teacherId: "",
      status: "active",
      bannerUrl: "",
      bannerCldPubId: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control
  } = form;

  const onSubmit = (values: z.infer<typeof classSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log("Error creating new classes", error);
    }
  };

  const teachers = [
    { id: "1", name: "Anna Kowalska" },
    { id: "2", name: "John Smith" },
  ];

  const subjects = [
    { id: 1, name: "Mathematics", code: "MATH" },
    { id: 2, name: "Computer Science", code: "CS" },
    { id: 3, name: "Physics", code: "PHY" },
  ];


  const bannerPublicId = form.watch('bannerCldPubId');

  const setBannerImage = (file: UploadWidgetValue | null, field: { onChange: (value: string) => void }) =>{
    if(file){
        field.onChange(file.url)
        form.setValue('bannerCldPubId', file.publicId, {
            shouldValidate: true,
            shouldDirty: true
        })
    }else{
        field.onChange('')
        form.setValue('bannerCldPubId', '', {
            shouldValidate: true,
            shouldDirty: true
        })
    }
  }
  return (
    <CreateView className="class-view">
      <Breadcrumb />
      <h1 className="page-title">Create a Class</h1>
      <div className="div intro-row">
        <p>Provide the required information below to add a class</p>
        <Button onClick={back}>Go back</Button>
      </div>

      <Separator />
      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="realtive z-10">
            <CardTitle className="text-2xl pb-0 font-bold">
              Fill the required fields
            </CardTitle>
          </CardHeader>
          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

             <FormField
                  control={control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Banner image <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <UploadWidget
                        value={field.value ?{url: field.value, publicId: bannerPublicId ?? ''} : null}
                        onChange={(file) => setBannerImage(file, field)}
                        disabled={isSubmitting}/>
                      </FormControl>
                      <FormMessage />
                      {errors.bannerCldPubId && !errors.bannerUrl && (
                        <p className="text-destructive text.sm">{errors.bannerCldPubId.message?.toString()}</p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to biology - Section A"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field?.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem
                                value={subject.id.toString()}
                                key={subject.id}
                              >
                                {subject.name} ({subject.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field?.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem
                                value={teacher.id.toString()}
                                key={teacher.id}
                              >
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                   <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacity</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="30"
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value ? Number(value) : undefined,
                                );
                              }}
                              value={(field.value as number | undefined) ?? ""}
                              name={field.name}
                              ref={field.ref}
                              onBlur={field.onBlur}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Status <span className="text-orange-600">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description about the class"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator />
                <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting…" : "Submit"}</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default ClassCreate;
