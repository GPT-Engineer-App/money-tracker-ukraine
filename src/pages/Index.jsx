import React, { useState } from "react";
import { Container, VStack, Heading, Input, Button, List, ListItem, Text, NumberInput, NumberInputField, Select, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const addTransaction = () => {
    if (!amount || !description) {
      toast({
        title: "Помилка",
        description: "Будь ласка, введіть суму та опис.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      amount: parseFloat(amount),
      type,
      description,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setDescription("");
    setType("expense");
    toast({
      title: "Успіх",
      description: "Транзакція додана.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="lg" textAlign="center">
          Фінансовий Трекер
        </Heading>
        <NumberInput value={amount} onChange={(valueString) => setAmount(valueString)}>
          <NumberInputField placeholder="Сума" />
        </NumberInput>
        <Input placeholder="Опис" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select placeholder="Виберіть тип" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Дохід</option>
          <option value="expense">Витрати</option>
        </Select>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTransaction}>
          Додати транзакцію
        </Button>
        <List spacing={3}>
          {transactions.map((transaction) => (
            <ListItem key={transaction.id} borderWidth="1px" borderRadius="lg" p={4}>
              <Text fontSize="md">{transaction.description}</Text>
              <Text fontSize="sm" color={transaction.type === "expense" ? "red.500" : "green.500"}>
                {transaction.type === "expense" ? "-" : "+"}
                {transaction.amount.toFixed(2)} UAH
              </Text>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
