import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [id, setId] = useState("");
  const [curso, setCurso] = useState("");
  const [bimestre, setBimestre] = useState("");

  function limpaCampos() {
    setNome("");
    setMatricula("");
    setId("");
    setCurso("");
    setBimestre("");
  }

  async function getAlunos() {
    try {
      const response = await axios.get("https://api-aluno.vercel.app/aluno/");
      setAlunos(response.data);
    } catch (erro) {
      alert("Erro ao buscar Aluno");
    }
  }

  async function addAluno(event) {
    event.preventDefault();

    try {
      await axios.post("https://api-aluno.vercel.app/aluno/", {
        nome: nome,
        matricula: matricula,
        curso: curso,
        bimestre: bimestre,
      });

      limpaCampos();

      getAlunos();
      alert("Aluno adicionado com sucesso");
    } catch (error) {
      alert("Erro ao tentar cadastrar Aluno");
    }
  }

  async function deleteAluno(id) {
    try {
      await axios.delete(`https://api-aluno.vercel.app/aluno${id}`);

      getAlunos();
      alert("Deletar Aluno?");
    } catch (error) {
      alert("Erro ao tentar deletar Aluno");
    }
  }

  function preencherForm(aluno) {
    setId(aluno._id);
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setCurso(aluno.curso);
    setBimestre(aluno.bimestre);
  }
  async function updateAluno(event) {
    event.preventDefault();
    try {
      await axios.put(`https://api-aluno.vercel.app/aluno${id}`, {
        nome:nome,
        matricula:matricula,
        curso:curso,
        bimestre:bimestre,
      });
      limpaCampos();

      getAlunos();

      alert("Aluno atualizado");
    } catch (error) {
      alert("Aluno não atualizado");
    }
  }

  useEffect(() => {
    getAlunos();
  }, []);

  return (
    <div>
      <h1>APi Alunos</h1>

      <form onSubmit={id ? updateAluno : addAluno}>
        <input
          placeholder="Digite Nome"
          type="text"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <br />
        <input
          placeholder="Digite Matricula"
          type="text"
          value={matricula}
          onChange={(event) => setMatricula(event.target.value)}
        />
        <br />
        <input
          style={{ width: 300, borderRadius: 4 }}
          type="text"
          placeholder="Informe o curso"
          value={curso}
          onChange={(event) => setCurso(event.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Informe o bimestre"
          value={bimestre}
          onChange={(event) => setBimestre(event.target.value)}
        />
        <br />
        <input type="submit" value={id ? "Atualizar" : "Adicionar" }  />
      </form>

      <ul>
        {alunos.map((aluno) => (
          <li key={aluno._id}>
            <h3>{aluno.nome}</h3>
            <h4>{aluno.matricula}</h4>
            <p>{aluno.curso}</p>
            <p>{aluno.bimestre}</p>

            <button onClick={() => deleteAluno(aluno._id)}>Apagar</button>
            <button onClick={() => preencherForm(aluno)}>Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
