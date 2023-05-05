import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

import { usePostsSlugId } from '@/hooks/usePosts';
import {
    Box,
    Container,
    Flex,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    VStack
} from '@chakra-ui/react';

import { BlogAuthor } from '@/components/Article';

const BlogTags = (props) => {
    return (
        <HStack spacing={2} marginTop={props.marginTop}>
            {
                (props.tags.length > 0) ? props.tags.map((tag) => {
                    return (
                        <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                            {tag}
                        </Tag>
                    );
                }) : ''
            }
        </HStack>
    );
};

export default function PostDetail() {
    const router = useRouter();
    const { slug, id } = router.query
    const { data, isLoading } = usePostsSlugId(slug, id)

    return (
        <Layout>
            {
                (isLoading) ? '' :
                    <Container maxW={'7xl'}>
                        <SimpleGrid
                            columns={{ base: 1, lg: 2 }}
                            spacing={{ base: 8, md: 10 }}
                            py={{ base: 18, md: 24 }}>
                            <Flex>
                                <Image
                                    rounded={'md'}
                                    alt={'product image'}
                                    src={
                                        'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                                    }
                                    fit={'cover'}
                                    align={'center'}
                                    w={'100%'}
                                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                                />
                            </Flex>
                            <Stack spacing={{ base: 6, md: 10 }}>
                                <Box as={'header'}>
                                    <Heading
                                        lineHeight={1.1}
                                        fontWeight={600}
                                        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                        {data?.title}
                                    </Heading>
                                    {/* <BlogTags tags={(!isLoading) ?? data?.tag.split(',')} /> */}
                                    <HStack spacing={2}>
                                        {
                                            data?.tag.split(',').map((tag) => {
                                                return (
                                                    <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
                                                        {tag}
                                                    </Tag>
                                                );
                                            })
                                        }
                                    </HStack>
                                </Box>
                                <BlogAuthor name="John Doe" date={new Date(data?.created_at)} />

                                <Stack
                                    spacing={{ base: 4, sm: 6 }}
                                    direction={'column'}>
                                    <VStack spacing={{ base: 4, sm: 6 }}>
                                        <Text fontSize={'lg'}>
                                            {data?.content}
                                        </Text>
                                    </VStack>
                                </Stack>
                            </Stack>
                        </SimpleGrid>
                    </Container>
            }
        </Layout>
    );
}
