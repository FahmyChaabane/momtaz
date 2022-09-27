import Image from "next/image";
import { FC, useContext } from "react";
import Popup from "./layout/popup";
import { Flex } from "./styles/flex.styled";
import Button from "./button";
import { ChildDto, ParentDto } from "../lib/interfaces";
import { StyledAvatar } from "./styles/profileAvatar";
import { Reference, useMutation, useQuery } from "@apollo/client";
import { DELETE_CHILD_MUTATION } from "../lib/mutations";
import { NotificationContext } from "./alertContext";
import { GET_PROFILE_QUERY } from "../lib/queries";

interface Props {
  child: ChildDto;
  closePopup: () => void;
}

const DeleteKidPopup: FC<Props> = ({ child, closePopup }) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const { data: profile } = useQuery<{ getProfile: ParentDto }>(
    GET_PROFILE_QUERY
  );
  const [deleteChild] = useMutation<
    { deleteChild: ChildDto },
    { childId: string }
  >(DELETE_CHILD_MUTATION, {
    onCompleted: ({ deleteChild }) => {
      closePopup();
      setNotificationAlert({
        show: true,
        msg: `${deleteChild.name} is succesfully deleted.`,
        type: "success",
      });
    },
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
    },
  });

  const onConfirm = () => {
    deleteChild({
      variables: {
        childId: child._id,
      },
      update(cache) {
        cache.modify({
          id: cache.identify({ ...profile?.getProfile }),
          fields: {
            children(existingChildRefs: Reference[] = [], { readField }) {
              return existingChildRefs.filter(
                (childRef) => child._id !== readField("_id", childRef)
              );
            },
          },
        });
      },
    });
  };

  const onCancel = () => {
    closePopup();
  };

  return (
    <Popup title="Delete Profile" closePopup={closePopup}>
      <Flex direction="column" align="center">
        <figure>
          <StyledAvatar height="6rem" width="6rem">
            <Image
              src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${child.avatar}`}
              alt="profile"
              layout="fill"
            />
          </StyledAvatar>
        </figure>
        <p>{child.name}</p>
        <p>
          you sure you want to erase {child.name} profile ? if yes pres Confirm
          , or just cancel
        </p>
        <Button
          text="Confirm"
          br="2rem"
          width="20rem"
          padding="1rem 1.5rem"
          onClick={onConfirm}
        />
        <Button
          text="Cancel"
          br="2rem"
          width="20rem"
          padding="1rem 1.5rem"
          bglg1="grey"
          bglg2="grey"
          onClick={onCancel}
        />
      </Flex>
    </Popup>
  );
};

export default DeleteKidPopup;
