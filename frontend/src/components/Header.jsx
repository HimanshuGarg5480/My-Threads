import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      <Flex alignItems={"center"} gap={1}>
        <Image
          cursor={"pointer"}
          alt="logo"
          w={6}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          onClick={toggleColorMode}
        />
        {!user && (
          <Link
            as={RouterLink}
            to={"/auth"}
            onClick={() => setAuthScreen("login")}
          >
            Login
          </Link>
        )}
      </Flex>

      {user && (
        <Box>
          <Box display={{ base: "block", sm: "none" }}>
            <Menu>
              <MenuButton
                w={3}
                as={Button}
                rightIcon={<HamburgerIcon />}
              ></MenuButton>
              <MenuList>
                <Link as={RouterLink} to="/">
                  <MenuItem>
                    <Flex gap={2}>
                      <AiFillHome size={24} />
                      <Text>Home</Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <Link as={RouterLink} to={`/${user.username}`}>
                  <MenuItem>
                    <Flex gap={2}>
                      <RxAvatar size={24} />
                      <Text>Profile</Text>
                    </Flex>
                  </MenuItem>
                </Link>

                <Link as={RouterLink} to={`/chat`}>
                  <MenuItem>
                    <Flex gap={2}>
                      <BsFillChatQuoteFill size={20} />
                      <Text>Chats</Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <Link as={RouterLink} to={`/settings`}>
                  <MenuItem>
                    <Flex gap={2}>
                      <MdOutlineSettings size={20} />
                      <Text>Settings</Text>
                    </Flex>
                  </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                  <Flex gap={2}>
                    <FiLogOut size={20} />
                    Logout
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box display={{ base: "none", sm: "block" }}>
            <Flex alignItems={"center"} gap={4}>
              <Link as={RouterLink} to="/">
                <AiFillHome size={24} />
              </Link>
              <Link as={RouterLink} to={`/${user.username}`}>
                <RxAvatar size={24} />
              </Link>
              <Link as={RouterLink} to={`/chat`}>
                <BsFillChatQuoteFill size={20} />
              </Link>
              <Link as={RouterLink} to={`/settings`}>
                <MdOutlineSettings size={20} />
              </Link>
              <Button size={"xs"} onClick={logout}>
                <FiLogOut size={20} />
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
