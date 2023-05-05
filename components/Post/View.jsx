import { convertDate } from '@/config';
import { useDeletePost, usePosts } from '@/hooks/usePosts';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Button,
    Link,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';


const ViewPost = ({ handleEdit }) => {
    const { data } = usePosts()
    const deletePost = useDeletePost();

    const handleDeletePost = (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            deletePost.mutate(postId);
        }
    }

    return (
        <>
            <TableContainer my={{ base: 4 }}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th isNumeric>No.</Th>
                            <Th>Title</Th>
                            <Th>Tags</Th>
                            <Th>Created At</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            (data?.length > 0) ?
                                data.map((datas, index) => {
                                    return (
                                        <Tr key={index}>
                                            <Td isNumeric>{index + 1}</Td>
                                            <Td>
                                                <Link color='blue.500' href={`/blog/${datas.slug}/${datas.id}`}>
                                                    {datas.title} <ExternalLinkIcon mx='2px' />
                                                </Link>
                                            </Td>
                                            <Td>
                                                {
                                                    datas.tag.split(',').map((tags, indexTags) => {
                                                        return (
                                                            <Tag key={indexTags} variant='solid' colorScheme='teal' mr='2'>
                                                                {tags}
                                                            </Tag>
                                                        )
                                                    })
                                                }
                                            </Td>
                                            <Td>{convertDate(datas.created_at)}</Td>
                                            <Td>
                                                <Button colorScheme={'teal'} size='sm' mr='2' onClick={() => handleEdit(datas)}>
                                                    Edit
                                                </Button>
                                                <Button colorScheme={'red'} size='sm' mr='2' onClick={() => handleDeletePost(datas.id)}>
                                                    Delete
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                }) :
                                <Tr>
                                    <Td colSpan={5} textAlign={'center'}>
                                        No Data
                                    </Td>
                                </Tr>
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default ViewPost