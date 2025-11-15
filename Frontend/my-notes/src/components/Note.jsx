 
import {Card, CardBody, CardFooter, CardHeader, Heading, Text, Divider} from '@chakra-ui/react'
import moment from "moment/moment";

export default function Note({title, description, createdAt}){
    return (
        <Card variant={"filled"}>
            <CardHeader>
              <Heading size={"md"}>{title}</Heading>
            </CardHeader>
            <Divider borderColor={"grey"}></Divider>
            <CardBody>
              <Text>{description}</Text>
            </CardBody>
            <Divider borderColor={"grey"}></Divider>
            <CardFooter>{moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}</CardFooter>
        </Card>
    );
 }