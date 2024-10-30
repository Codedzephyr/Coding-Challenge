"use client";

import { Button, Center, HStack, Stack, Table, Flex, Box } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaArrowRight, FaBarcode } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";


export const PaginatedTable = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  const fetchData = useCallback(
    async (page: number) => {
      try {
        const start = (page - 1) * limit;

        const response = await axios.get(
          "https://api.coinlore.net/api/tickers/",
          {
            params: { start, limit },
          }
        );

        setData(response.data);

        const totalItems = response.data.info?.coins_num || 100;
        setTotalPages(Math.ceil(totalItems / limit));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    [limit]
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  type TCoin = {
    id: string;
    name: string;
    symbol: string;
    price_usd: string;
    tsupply: string;
  };

  interface ApiResponse {
    data: TCoin[];
    info: {
      coins_num: number;
    };
  }

  if (!data) return <></>;

  return (
    <Center>
      <Stack mt="2rem" boxShadow="lg" gap="0rem" width="40rem">
      <Box boxShadow="lg" borderRadius="md" overflow="hidden">
        <Table.Root
          size="sm"
          variant="outline"
          striped
          interactive
        >
          <Table.Header borderBottomStyle="hidden">
            <Table.Row bgColor="white">
              <Table.ColumnHeader>
                <Flex gap="0.4rem">
                  <Center>
                    <BsCoin size="1rem" />
                  </Center>{" "}
                  Coin
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader gap="0.2rem">
                <Flex gap="0.4rem">
                  <Center>
                    <FaBarcode size="1rem" />
                  </Center>
                  Code
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Flex gap="0.4rem">
                  {" "}
                  <Center>
                    <IoIosPricetags size="1rem" />
                  </Center>{" "}
                  Price
                </Flex>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Flex gap="0.4rem">
                  {" "}
                  <Center>
                    <FaCoins size="1rem" />
                  </Center>{" "}
                  Total Supply{" "}
                </Flex>
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.data.map((item: TCoin) => (
              <Table.Row
                style={{ borderBottom: 'none' }} 
                key={item.id}
              >
                <Table.Cell borderBottom="none">{item.name}</Table.Cell>
                <Table.Cell>{item.symbol}</Table.Cell>
                <Table.Cell>&#x24;{item.price_usd}</Table.Cell>
                <Table.Cell>{item.tsupply}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <HStack
          width="100%"
          py="0.2rem"
          justify={page === 1 ? "flex-end" : "space-between"}
          border="1px solid #e4e4e7"
          borderTop="none"
          borderBottomLeftRadius="0.2rem"
          borderBottomRightRadius="0.2rem"
        >
          {page !== 1 && (
            <Button variant="plain"     size="sm" onClick={handlePrevious} px="0.5rem">
              <FaArrowLeft size="0.6rem" />
              Previous
            </Button>
          )}
          <Button
            variant="plain"
            onClick={handleNext}
            px="0.5rem"
            size="sm"
            disabled={page === totalPages}
          >
            Next
            <FaArrowRight />
          </Button>
        </HStack>
        </Box>
      </Stack>
    </Center>
  );
};
