"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";

import { Social } from "@components/auth/Social";
import { Header } from "@components/auth/Header";
import { BackButton } from "@components/auth/BackButton";

interface Props {
  children: React.ReactNode;
  headerTitle: string;
  headerDescription?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerTitle,
  headerDescription = "",
  backButtonLabel,
  backButtonHref,
  showSocial,
}: Props) => {
  return (
    <Card className="w-[500px] border-none shadow-none sm:border sm:shadow">
      <CardHeader>
        <Header title={headerTitle} description={headerDescription} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <Social />}
      {backButtonHref && backButtonLabel && (
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      )}
    </Card>
  );
};
