import Layout from "@/components/Layout";
import CreatePost from "@/components/Post/Create";
import EditPost from "@/components/Post/Edit";
import ViewPost from "@/components/Post/View";

import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack
} from '@chakra-ui/react';
import { useState } from "react";

import { fetchPosts } from "@/hooks/usePosts";
import { dehydrate, QueryClient } from 'react-query';

export default function Home() {
  const [showTable, setShowTable] = useState(true);
  const [editData, setEditData] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const handleEdit = (dataId) => {
    setEditData(true)
    setDataEdit(dataId)
    setShowTable(false)
  }

  const handleButton = () => {
    if (editData) {
      setEditData(!editData)
      setShowTable(true)
    } else {
      setShowTable(!showTable)
    }
  }

  return (
    <>
      <Layout>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 10, md: 26 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '1xl', sm: '2xl', md: '3xl' }}>
            Data Post <br />
          </Heading>
          <Box borderWidth='1px' borderRadius='lg' textAlign={'left'} px={{ base: 5, md: 10 }}>
            <Flex>
              <Heading
                fontWeight={600}
                fontSize={{ base: '1xl', sm: '1xl', md: '2xl' }} m={{ base: 4 }}>
                Data Post
              </Heading>
              <Spacer />
              <Button colorScheme={(showTable) ? 'teal' : 'red'} size='md' m={{ base: 4 }} onClick={() => handleButton()}>
                {(showTable && !editData) ? 'Add Data' : 'Cancel'}
              </Button>
            </Flex>
            {
              (showTable) ? <ViewPost handleEdit={handleEdit} /> :
                (editData) ? <EditPost dataEdit={dataEdit} setEditData={setEditData} setShowTable={setShowTable} /> : <CreatePost setShowTable={setShowTable} />
            }
          </Box>
        </Stack>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('posts', () => fetchPosts())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}