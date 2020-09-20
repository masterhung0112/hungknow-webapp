import React from "react";
import { storiesOf } from "@storybook/react";
import SignupEmail, { SignupEmailProps } from "./signupEmail";
import { PasswordConfig } from "hkclient-ts/types/config";
import { UserProfile } from "hkclient-ts/types/users";
import { ActionResult } from "hkclient-ts/types/actions";

const baseProps = {
  location: {
    search: "",
  },
  hasAccounts: false,
  enableSignUpWithEmail: true,
  customDescriptionText: undefined,
  siteName: "Hung Know",
  passwordConfig: {
    minimumLength: 3,
    requireLowercase: false,
    requireNumber: false,
    requireSymbol: false,
    requireUppercase: false,
  } as PasswordConfig,
  actions: {
    createUser: async (
      user: UserProfile,
      token: string,
      inviteId: string,
      redirect: string
    ): Promise<ActionResult> => {
      return {
        data: true,
      };
    },
    loginById: async (
      id: string,
      password: string,
      mfaToken?: string
    ): Promise<ActionResult> => {
      return {
        data: true,
      };
    },
  },
  privacyPolicyLink: undefined,
  termsOfServiceLink: undefined,
} as SignupEmailProps;

storiesOf("Sign Up Email", module).add("Enable Email", () => {
  return <SignupEmail {...baseProps} />;
});
