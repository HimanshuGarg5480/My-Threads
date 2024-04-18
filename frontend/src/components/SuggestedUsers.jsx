import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SuggestedUser from "./SuggestedUser";
import useShowToast from "../hooks/useShowToast";
import { SearchIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const SuggestedUsers = () => {
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const handleConversationSearch = async (e) => {
    e.preventDefault();
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }

      const findingYourself = searchedUser._id === currentUser._id;
      if (findingYourself) {
        showToast("Error", "You cannot message yourself", "error");
        return;
      }
      const searchedUserInSuggestedUsersList = suggestedUsers.find(
				(user) => user._id === searchedUser._id
			);

			if (searchedUserInSuggestedUsersList) {
				return;
			}
      setSuggestedUsers((prevConvs) => [...prevConvs, searchedUser]);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearchingUser(false);
    }
  };

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getSuggestedUsers();
  }, [showToast]);
  return (
    <>
      <Text mb={4} fontWeight={"bold"}>
        Suggested Users
      </Text>
      <Flex direction={"column"} gap={4}>
        <form onSubmit={handleConversationSearch}>
          <Flex alignItems={"center"} gap={2}>
            <Input
              placeholder="Search for a user"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              size={"sm"}
              onClick={handleConversationSearch}
              isLoading={searchingUser}
            >
              <SearchIcon />
            </Button>
          </Flex>
        </form>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 4].map((_, idx) => (
            <Flex
              key={idx}
              gap={2}
              alignItems={"center"}
              p={"1"}
              borderRadius={"md"}
            >
              {/* avatar skeleton */}
              <Box>
                <SkeletonCircle size={"10"} />
              </Box>
              {/* username and fullname skeleton */}
              <Flex w={"full"} flexDirection={"column"} gap={2}>
                <Skeleton h={"8px"} w={"80px"} />
                <Skeleton h={"8px"} w={"90px"} />
              </Flex>
              {/* follow button skeleton */}
              <Flex>
                <Skeleton h={"20px"} w={"60px"} />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
};

export default SuggestedUsers;

// Loading skeletons for suggested users, if u want to copy and paste as shown in the tutorial

// <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
// 							{/* avatar skeleton */}
// 							<Box>
// 								<SkeletonCircle size={"10"} />
// 							</Box>
// 							{/* username and fullname skeleton */}
// 							<Flex w={"full"} flexDirection={"column"} gap={2}>
// 								<Skeleton h={"8px"} w={"80px"} />
// 								<Skeleton h={"8px"} w={"90px"} />
// 							</Flex>
// 							{/* follow button skeleton */}
// 							<Flex>
// 								<Skeleton h={"20px"} w={"60px"} />
// 							</Flex>
// 						</Flex>
