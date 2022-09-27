import { gql } from "@apollo/client";
import { CHILD_FIELDS, PARENT_FIELDS } from "./fragments";

export const REGISTER_PARENT_MUTATION = gql`
  ${PARENT_FIELDS}
  mutation RegisterParent($registerParentInput: RegisterParentInput!) {
    registerParent(registerParentInput: $registerParentInput) {
      ...ParentFields
    }
  }
`;

export const CONFIRM_USER_MUTATION = gql`
  mutation ConfirmUser($confirmationCode: String!) {
    confirmUser(confirmationCode: $confirmationCode)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  ${PARENT_FIELDS}
  mutation Forgotpassword($forgotPwdDtoInput: ForgotPwdDtoInput!) {
    forgotpassword(forgotPwdDtoInput: $forgotPwdDtoInput) {
      ...ParentFields
    }
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  ${PARENT_FIELDS}
  mutation Resetpassword(
    $resetPasswordToken: String!
    $resetPwdDtoInput: ResetPwdDtoInput!
  ) {
    resetpassword(
      resetPasswordToken: $resetPasswordToken
      resetPwdDtoInput: $resetPwdDtoInput
    ) {
      ...ParentFields
    }
  }
`;

export const ADD_CHILD_MUTATION = gql`
  ${CHILD_FIELDS}
  mutation AddChild($addChildInput: AddChildInput!) {
    addChild(addChildInput: $addChildInput) {
      ...ChildFields
    }
  }
`;

export const DELETE_CHILD_MUTATION = gql`
  ${CHILD_FIELDS}
  mutation DeleteChild($childId: String!) {
    deleteChild(childId: $childId) {
      ...ChildFields
    }
  }
`;
