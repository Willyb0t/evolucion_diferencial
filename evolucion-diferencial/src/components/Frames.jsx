import React, { useContext } from 'react'
import './pacman.css';
import { ParamsContext } from '../context/ParamsContext';


const Frames = () => {
    const {elements, setElements} = useContext(ParamsContext);
    const {generaciones, setGeneraciones} = useContext(ParamsContext);
    const {boton, setboton} = useContext(ParamsContext);
    const popMax = [];
    const popMin = [];
    let masSolPop = [];
    let minSolPop = []

    class EvolutionaryAlgorithm {
        constructor(numVectors, numIterations, maximize = true) {
            this.numVectors = numVectors;
            this.numIterations = numIterations;
            this.maximize = maximize;
            this.population = [];
            this.F = 0.5; // Factor de mutación fijo
        }
    
        // Inicializar la población con vectores aleatorios
        initializePopulation() {
            this.population = Array.from({ length: this.numVectors }, () => this.generateRandomVector());
        }
    
        // Generar un vector aleatorio
        generateRandomVector() {
            const x = this.getRandomCoordinate();
            const y = this.getRandomCoordinate();
            const z = this.getRandomCoordinate();
            return [x, y, z];
        }
    
        // Obtener una coordenada aleatoria dentro del rango [-10, 10]
        getRandomCoordinate() {
            const randomNumber = Math.random() * 20 - 10; // Valores entre -10 y 10
            return Math.round(randomNumber *1000)/1000;
        }
    
        // Evolucionar la población
        evolvePopulation() {
            for (let iter = 0; iter < this.numIterations; iter++) {
                const newPopulation = [];
                for (let i = 0; i < this.numVectors; i++) {
                    const targetVector = this.population[i];
                    if (!Array.isArray(targetVector) || targetVector.length !== 3) {
                        continue; // Pasar a la siguiente iteración si el vector objetivo no es válido
                    }
    
                    const [x, y, z] = targetVector;
    
                    // Seleccionar tres vectores diferentes al azar
                    const [v1, v2, v3] = this.getRandomVectors(i);
    
                    const mutantVector = v1?.map((v1Coord, j) => {
                        let newValue = v1Coord + this.F * (v2[j] - v3[j]);
                        // Asegurar que el nuevo valor esté dentro del rango [-10, 10]
                        if (newValue > 10) {
                            newValue = 10;
                        } else if (newValue < -10) {
                            newValue = -10;
                        }
                        return newValue;
                    });
    
                    newPopulation.push(mutantVector);
                }
                // Reemplazar la población anterior con la nueva población generada
                this.population = newPopulation;
                if(this.maximize === true){
                    popMax.push([...this.population]);
                } else if (this.maximize === false){
                    popMin.push([...this.population]);
                }
            }
        }
    
        // Seleccionar tres vectores diferentes al azar
        getRandomVectors(excludeIndex) {
            const indices = [...Array(this.numVectors).keys()].filter(idx => idx !== excludeIndex);
            const randomIndices = this.shuffleArray(indices).slice(0, 3);
            return randomIndices.map(idx => this.population[idx]);
        }
    
        // Barajar un array (Fisher-Yates shuffle)
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    
        // Encontrar la mejor solución
        findBestSolution() {
            let bestVector = this.population[0];
            for (const vector of this.population) {
                if (this.maximize ? this.objectiveFunction(...vector) > this.objectiveFunction(...bestVector) : this.objectiveFunction(...vector) < this.objectiveFunction(...bestVector)) {
                    bestVector = vector;
                }
            }
            return bestVector;
        }
    
        // Obtener la población completa
        getPopulation() {
            return this.population;
        }
    
        // Función objetivo
        objectiveFunction(x, y, z) {
            return Math.pow(x, 2) + Math.pow(y, 3) + Math.pow(z, 4);
        }
    }
    
    // Ejemplo de uso
    //const numVectors = 4;
    //const numIterations = 5;
    if (boton === true){
        const eaMaximize = new EvolutionaryAlgorithm(Number(elements), Number(generaciones), true);
        eaMaximize.initializePopulation();
        eaMaximize.evolvePopulation();
        const maxSol = eaMaximize.findBestSolution();
        console.log(maxSol);
        masSolPop = eaMaximize.getPopulation();


        const eaMinimize = new EvolutionaryAlgorithm(Number(elements), Number(generaciones), false);
        eaMinimize.initializePopulation();
        eaMinimize.evolvePopulation();
        const minSol = eaMinimize.findBestSolution();
        minSolPop = eaMinimize.getPopulation();

        console.log('minsol')
        console.log(minSol);
        console.log('familias min');
        console.log(popMin);
        console.log('familias max');
        console.log(popMax);
    }
    
    //console.log("Maximizar - Mejor solución:", eaMaximize.findBestSolution());
    //console.log("Maximizar - Población completa:", eaMaximize.getPopulation());
    
    
    //console.log("Minimizar - Mejor solución:", eaMinimize.findBestSolution());
    //console.log("Minimizar - Población completa:", eaMinimize.getPopulation());     
    
  return (
    <div className="container text-center" style={{marginTop:'40px'}}>
        <p style={{marginTop:'-45px', fontSize:'1.4rem'}} className='h3 badge text-wrap'>Computo Evolutivo</p>
        <div className="row">
            <div className="col">
            Maximizar funcion x^2 + y^3 + z^4
            </div>
            <div className="col">
            Minimizar funcion x^2 + y^3 + z^4
            </div>
        </div>
        <hr style={{marginLeft:'-400px', marginRight:'-1000px'}}/>
        <div className="row">
            <div className="col-sm-6">
            <div style={{marginLeft:'6rem'}} className='col-sm-6'>{popMax && popMax.map((poblacion, index) =>(
                            <div className='col-sm-6' key={index}>
                                <p style={{marginLeft:'40px'}} className='translate-middle badge rounded-pill text-bg-secondary'>Familia {index +1} Maximizar</p>
                                <ul style={{marginLeft:'-60px'}}>
                                    {poblacion.map((item, idx)=>(
                                        <li className='col-sm-6' key={idx}>{item.toString()}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                )}</div>
                <p style={{marginLeft:'-6.9rem'}} className='translate-middle badge rounded-pill text-bg-secondary'>Mejor generacion</p>
                <ul  style={{marginLeft:'1.5rem'}}>
                                {masSolPop.map((item, idx)=>(
                                    <li className='col-sm-6' key={idx}>{item.toString()}</li>
                                ))}
                </ul>
            </div>
            <div className="col-sm-6">
                <div style={{marginLeft:'6rem'}} className='col-sm-6'>{popMin && popMin.map((poblacion, index) =>(
                                <div className='col-sm-6' key={index}>
                                    <p className='translate-middle badge rounded-pill text-bg-secondary'>Familia {index +1} Minimizar</p>
                                    <ul style={{marginLeft:'-60px'}}>
                                        {poblacion.map((item, idx)=>(
                                            <li className='col-sm-6' key={idx}>{item.toString()}</li>
                                        ))}
                                    </ul>
                                </div>
                            )
                    )}</div>
                    <p style={{marginLeft:'-11rem'}} className='translate-middle badge rounded-pill text-bg-secondary'>Mejor generacion</p>
                    <ul style={{marginLeft:'1.5rem'}}>
                                {minSolPop && minSolPop.map((item, idx)=>(
                                    <li className='col-sm-6' key={idx}>{item.toString()}</li>
                                ))}
                </ul>
                </div>
            </div>
    </div>
  )
}

export default Frames