// FormPopup.tsx
import React, { FocusEventHandler, useState } from "react";

interface FormPopupProps {
  onClose: () => void;
}
const FormPopup: React.FC<FormPopupProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    nome: "",
    grupo: "",
    centroCusto: "",
    tipoCliente: "PF",
    cpf: "",
    cnpj: "",
    email: "",
    telefone: "",
    diaInicio: "",
    valor: "",
    obs: "",
  });
  //TODO: FAZER UM CARD INVES DE UM OPTION PARA OS GRUPOS E OS CENTROS DE CUSTO, PARA EXPOR A DESCRICAO DE CADA CODIGO
  const [groupOptions, setGroupOptions] = useState<
    Array<[string, string | null]>
  >([
    ["GRP1", "Descricao 1"],
    ["GRP2", "Descricao 2"],
    // Add more groups as needed
  ]);

  const [ccOptions, setCCOptions] = useState<Array<[string, string | null]>>([
    ["CC1", "Descricao 1"],
    ["CC2", "Descricao 2"],
    // Add more groups as needed
  ]);
  const handleChange = (field: string, value: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };
  const sendData = () => {
    const { tipoCliente, cpf, cnpj, ...rest } = formValues;
    const cpf_cnpj = tipoCliente === "PF" ? cpf : cnpj;

    const dataToSend = {
      ...rest,
      cpf_cnpj,
    };
    console.log("Data sent:", dataToSend);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendData();
    // Handle form submission logic here
    // You can access form data from the formValues object
    onClose(); // Close the form after submission (you can adjust this behavior)
  };
  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div className="w-full max-w-screen-md rounded-lg bg-white p-6">
        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="mb-4 flex">
            <label htmlFor="nome" className="block w-1/4 text-sm font-bold">
              Nome*:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              className="flex-grow border border-gray-300 p-2"
              value={formValues.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
          </div>

          {/*  {/* Grupo */}
          <div className="mb-4 flex">
            <label htmlFor="grupo" className="block w-1/4 text-sm font-bold">
              Grupo*:
            </label>
            <select
              id="grupo"
              name="grupo"
              required
              className="flex-grow border border-gray-300 p-2"
              value={formValues.grupo}
              onChange={(e) => handleChange("grupo", e.target.value)}
            >
              <option value="" disabled>
                Escolha um grupo
              </option>
              {groupOptions.map(([code, description]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>

          {/*Centro de Custo */}
          <div className="mb-4 flex">
            <label
              htmlFor="centroCusto"
              className="block w-1/4 text-sm font-bold"
            >
              Centro de Custo*:
            </label>
            <select
              id="centroCusto"
              name="centroCusto"
              required
              className="flex-grow border border-gray-300 p-2"
              value={formValues.centroCusto}
              onChange={(e) => handleChange("centroCusto", e.target.value)}
            >
              <option value="" disabled>
                Escolha um Centro de Custo
              </option>
              {ccOptions.map(([code, description]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
          {/* Tipo de cliente */}
          <div className="mb-4 flex">
            <label
              htmlFor="tipoCliente"
              className="block w-1/4 text-sm font-bold"
            >
              Tipo de Cliente*:
            </label>

            <select
              id="tipoCliente"
              name="tipoCliente"
              required
              className="flex-grow border border-gray-300 p-2"
              value={formValues.tipoCliente}
              onChange={(e) => handleChange("tipoCliente", e.target.value)}
            >
              <option value="" disabled>
                Escolha um tipo de cliente
              </option>
              <option value="PF">PF</option>
              <option value="PJ">PJ</option>
            </select>
          </div>

          {/* CPF or CNPJ based on Tipo de Cliente */}
          {formValues.tipoCliente === "PF" && (
            <div className="mb-4 flex">
              <label htmlFor="cpf" className="block w-1/4 text-sm font-bold">
                CPF:
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                pattern="[0-9]{11}"
                placeholder="123.456.789-01"
                className="flex-grow border border-gray-300 p-2"
                value={formValues.cpf}
                onChange={(e) => handleChange("cpf", e.target.value)}
              />
            </div>
          )}

          {formValues.tipoCliente === "PJ" && (
            <div className="mb-4 flex">
              <label htmlFor="cnpj" className="block w-1/4 text-sm font-bold">
                CNPJ:
              </label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                placeholder="12.345.678/0001-01"
                className="flex-grow border border-gray-300 p-2"
                value={formValues.cnpj}
                onChange={(e) => handleChange("cnpj", e.target.value)}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4 flex">
            <label htmlFor="email" className="block w-1/4 text-sm font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="flex-grow border border-gray-300 p-2"
              value={formValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          {/* Telefone */}
          <div className="mb-4 flex">
            <label htmlFor="telefone" className="block w-1/4 text-sm font-bold">
              Telefone:
            </label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              pattern="\(\d{2}\)\d{9}"
              placeholder="(00)123456789"
              className="flex-grow border border-gray-300 p-2"
              value={formValues.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
            />
          </div>
          {/* Dia de inicio */}
          <div className="mb-4 flex">
            <label
              htmlFor="diaInicio"
              className="block w-1/4 text-sm font-bold"
            >
              Dia de Início:
            </label>
            <input
              type="date"
              id="diaInicio"
              name="diaInicio"
              className="flex-grow border border-gray-300 p-2"
              value={formValues.diaInicio}
              onChange={(e) => handleChange("diaInicio", e.target.value)}
            />
          </div>

          {/* Valor */}
          <div className="mb-4 flex">
            <label htmlFor="valor" className="block w-1/4 text-sm font-bold">
              Valor*:
            </label>
            <input
              type="text"
              id="valor"
              name="valor"
              pattern="\d+\,\d{2}"
              placeholder="1234.56"
              className="flex-grow border border-gray-300 p-2"
              required
              value={formValues.valor}
              onChange={(e) => handleChange("valor", e.target.value)}
            />
          </div>

          {/* OBS */}
          <div className="mb-4 flex">
            <label htmlFor="obs" className="block w-1/4 text-sm font-bold">
              OBS:
            </label>
            <textarea
              id="obs"
              name="obs"
              className="flex-grow border border-gray-300 p-2"
              value={formValues.obs}
              onChange={(e) => handleChange("obs", e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            {/* Submit button */}
            <button
              type="submit"
              className="rounded-full bg-blue-500 px-4 py-2 text-white"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPopup;
