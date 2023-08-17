import Center from "@/components/Center";
import Header from "@/components/Header";
import { styled } from "styled-components";
import {signOut, useSession} from "next-auth/react";
import Button from "@/components/Button";

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export default function AccountPage() {
    const session = useSession();
    function logout(){
        signOut();
    }
    return(
        <>
            <Header/>
            <Center>
                <Title></Title>
                {session && (<Button $primary onClick={logout}>Wyloguj</Button>)}
            </Center>
        </>
    )
}