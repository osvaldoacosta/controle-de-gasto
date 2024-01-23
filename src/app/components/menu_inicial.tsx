"use client";
import React, { useState } from "react";
import FormPopup from "./user_add_form";

//TODO: SEPARAR MELHOR EM OUTROS COMPONENTES
interface CardData {
  nome: string;
  codigo: string;
  centroCusto: string;
  situacao: string;
  isPessoaFisica: boolean;
}

interface CardProps {
  cardData: CardData;
  onClick: () => void;
}

const CustomCard: React.FC<CardProps> = ({ cardData, onClick }) => {
  return (
    <div
      className={`mb-5 rounded-lg border p-4 ${
        cardData.isPessoaFisica ? "bg-green-100" : "bg-blue-100"
      } mx-auto max-w-md cursor-pointer`}
      onClick={onClick}
    >
      <div className="mb-3 flex items-center">
        <div
          className={`rounded-full p-2 text-white ${
            cardData.isPessoaFisica ? "bg-hardgreen" : "bg-hardblue"
          }`}
        >
          {cardData.isPessoaFisica ? "PF" : "PJ"}
        </div>

        <div className="ml-3">
          <strong>Código:</strong> {cardData.codigo}
        </div>
      </div>

      <div className="mb-2">
        <strong>Nome:</strong> {cardData.nome || "Placeholder"}
      </div>

      <div className="mb-2 flex">
        <div className="mr-3">
          <strong>Centro de Custo:</strong>{" "}
          {cardData.centroCusto || "Placeholder"}
        </div>
        <div>
          <strong>Situação:</strong> {cardData.situacao || "Placeholder"}
        </div>
      </div>
    </div>
  );
};
const CardList: React.FC = () => {
  //TODO: vai ser dados do banco
  const cardListData: CardData[] = [
    {
      codigo: "001",
      nome: "John Doe",
      situacao: "Ativo",
      centroCusto: "CC-001",
      isPessoaFisica: true,
    },
    {
      codigo: "002",

      nome: "Jane Smith",
      centroCusto: "CC-002aaaaaaa",
      situacao: "Inativo",
      isPessoaFisica: false,
    },
    // Add more data as needed
  ];

  const handleCardClick = () => {
    console.log("Card Clicked!");
  };
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "#dbe8ff" }}
    >
      <div className="rounded-lg bg-white p-14">
        {cardListData.map((cardData, index) => (
          <CustomCard
            key={index}
            cardData={cardData}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <button
        className="absolute right-4 top-4 h-12 w-12 rounded-full bg-blue-500 p-2 text-2xl font-extrabold text-white"
        onClick={toggleForm}
      >
        +
      </button>
      {showForm && <FormPopup onClose={toggleForm} />}
    </div>
  );
};

export default CardList;
