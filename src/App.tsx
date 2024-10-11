import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import program from "../helloworld/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker";
const aleoWorker = AleoWorker();

interface SalaryData {
  industry: string;
  experience: string;
  salary: string;
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [salaryData, setSalaryData] = useState<SalaryData>({
    industry: '',
    experience: '',
    salary: ''
  });
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function executeSalaryComparison() {
    if (!account) {
      alert("Please generate an account first");
      return;
    }

    setExecuting(true);
    try {
      const result = await aleoWorker.localProgramExecution(
        program,
        "add_salary",
        [
          `${salaryData.industry}u32`,
          `${salaryData.experience}u32`,
          `${salaryData.salary}u64`,
        ],
      );
      setComparisonResult(JSON.stringify(result));
    } catch (error) {
      console.error(error);
      setComparisonResult("Error executing comparison");
    }
    setExecuting(false);
  }

  async function deploySalaryProgram() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(program);
      console.log("Transaction:");
      console.log("https://explorer.hamp.app/transaction?id=" + result);
      alert("Transaction ID: " + result);
    } catch (e) {
      console.error(e);
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }

  const handleInputChange = (field: keyof SalaryData, value: string) => {
    setSalaryData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="App">
      <div className="logo-container">
        <a href="https://aleo.org" target="_blank">
          <img src={aleoLogo} className="logo" alt="Aleo logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1 className="title">ZK Salary Equality</h1>

      <div className="card account-card">
        <button className="button" onClick={generateAccount}>
          {account ? `Account: ${account.slice(0, 10)}...` : 'Generate Account'}
        </button>
        
        <button 
          className="button"
          onClick={deploySalaryProgram}
          disabled={deploying || !account}
        >
          {deploying ? 'Deploying...' : 'Deploy Program'}
        </button>
      </div>

      <div className="card salary-card">
        <h2>Salary Comparison</h2>
        <div className="input-group">
          <label>
            Industry Code:
            <input
              type="number"
              value={salaryData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              placeholder="e.g., 1 for Tech"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Years of Experience:
            <input
              type="number"
              value={salaryData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="e.g., 5"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Annual Salary:
            <input
              type="number"
              value={salaryData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              placeholder="e.g., 75000"
            />
          </label>
        </div>
        <button
          className="button primary"
          onClick={executeSalaryComparison}
          disabled={executing || !account}
        >
          {executing ? 'Processing...' : 'Compare Salary'}
        </button>
        
        {comparisonResult && (
          <div className="result">
            <p>{comparisonResult}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;