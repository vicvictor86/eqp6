import { fireEvent, render, screen } from "@testing-library/react"
import GerenciarFotos from "../../views/gerenciarFotos/GerenciarFotos";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();//função 'fantasma'
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate //substitui a useNavigate por uma função vazia para saber se a troca de telas está funcionando
}))

describe("GerenciarFotos", () => {
    test("should render correctly", () => {
        render(
            <BrowserRouter>
                <GerenciarFotos/>
            </BrowserRouter>
        )

        expect(screen.getByText("Adicionar Foto")).toBeInTheDocument();
        expect(screen.getByText("Deletar")).toBeInTheDocument();
    })

    test("should call handleOpenModal when click in button Adicionar Foto", () => {
        render(
            <BrowserRouter>
                <GerenciarFotos/>
            </BrowserRouter>
        )

        const btnAddPhoto = screen.getByText("Adicionar Foto");
        fireEvent.click(btnAddPhoto);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        //wexpect(mockNavigate)
    })
})