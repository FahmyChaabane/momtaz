import { FC, useContext, useEffect, useState } from "react";
import Popup from "./layout/popup";
import Image from "next/image";
import Button from "./button";
import { Flex } from "./styles/flex.styled";
import { AddKidAvatarFigure } from "./styles/addKidAvatarFigure.styled";
import { Reference, useMutation, useQuery } from "@apollo/client";
import { GET_AVATARS_QUERY, GET_PROFILE_QUERY } from "../lib/queries";
import Loader from "./loader";
import { NotificationContext } from "./alertContext";
import { StyledAvatar } from "./styles/profileAvatar";
import { SubmitHandler, useForm } from "react-hook-form";
import { ADD_CHILD_MUTATION } from "../lib/mutations";
import { ChildDto, PaginationArgs, ParentDto } from "../lib/interfaces";
import { CHILD_FIELDS } from "../lib/fragments";
import {
  StyledArrowContainer,
  Styledleft,
  StyledRight,
} from "./styles/pagination.styled";

interface Props {
  closePopup: () => void;
}

interface AddChildForm {
  name: string;
}

interface AddChildInput {
  name: string;
  avatar: string;
}

const AddKidPopup: FC<Props> = ({ closePopup }) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const { register, handleSubmit, reset } = useForm<AddChildForm>();
  const [offset, setoffset] = useState(0);

  const { data: profile } = useQuery<{ getProfile: ParentDto }>(
    GET_PROFILE_QUERY
  );
  const { data, loading, fetchMore } = useQuery<
    {
      getAvatars: string[];
    },
    PaginationArgs
  >(GET_AVATARS_QUERY, {
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
    },
  });

  useEffect(() => {
    setSelectedAvatar(data?.getAvatars[0] || "");
  }, [data]);

  const [addChild] = useMutation<
    { addChild: ChildDto },
    { addChildInput: AddChildInput }
  >(ADD_CHILD_MUTATION, {
    onCompleted: ({ addChild }) => {
      reset();
      closePopup();
      setNotificationAlert({
        show: true,
        msg: `${addChild.name} is succesfully added.`,
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

  const onSubmit: SubmitHandler<AddChildForm> = (data) => {
    addChild({
      variables: {
        addChildInput: {
          name: data.name,
          avatar: selectedAvatar,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({ ...profile?.getProfile }),
          fields: {
            children(existingChildRefs: Reference[] = []) {
              const newChildRef = cache.writeFragment({
                data: data?.addChild,
                fragment: CHILD_FIELDS,
              });
              return [...existingChildRefs, newChildRef];
            },
          },
        });
      },
    });
  };

  let avatars = data?.getAvatars || [];
  avatars = avatars.slice(offset, offset + 5);

  return (
    <Popup title="Add Profile" closePopup={closePopup}>
      {!loading ? (
        <Flex direction="column" align="center">
          {selectedAvatar && (
            <StyledAvatar height="8rem" width="8rem">
              <Image
                src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${selectedAvatar}`}
                alt="profile"
                layout="fill"
              />
            </StyledAvatar>
          )}
          <em>select your child avatar</em>
          <Flex align="center">
            <StyledArrowContainer
              overflowed={offset > 0}
              onClick={() => {
                if (offset > 0) {
                  fetchMore({
                    variables: {
                      offset: offset - 5,
                    },
                  }).then(() => {
                    setoffset(offset - 5);
                  });
                }
              }}
            >
              <Styledleft></Styledleft>
            </StyledArrowContainer>
            {avatars.map((avatar, index) => (
              <AddKidAvatarFigure
                key={index}
                selected={avatar === selectedAvatar}
                onClick={() => setSelectedAvatar(avatar)}
              >
                <StyledAvatar height="3rem" width="3rem">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${avatar}`}
                    alt="profile"
                    layout="fill"
                  />
                </StyledAvatar>
              </AddKidAvatarFigure>
            ))}
            <StyledArrowContainer
              overflowed={offset < 45}
              onClick={() => {
                if (offset < 45) {
                  fetchMore({
                    variables: {
                      offset: offset + 5,
                    },
                  }).then(() => {
                    setoffset(offset + 5);
                  });
                }
              }}
            >
              <StyledRight></StyledRight>
            </StyledArrowContainer>
          </Flex>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="your kid name"
              {...register("name", { required: true })}
            />
            <Button
              type="submit"
              text="Add Child"
              br="2rem"
              width="25rem"
              padding="1rem 1.5rem"
            />
          </form>
        </Flex>
      ) : (
        <Loader />
      )}
    </Popup>
  );
};

export default AddKidPopup;
