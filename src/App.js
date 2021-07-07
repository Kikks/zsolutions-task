import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Local Imports
import Card from "./components/Card";
import "./assets/scss/main.scss";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			duration: 0.5
		}
	}
};

function App() {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("https://asm-dev-api.herokuapp.com/api/v1/food")
			.then(res => {
				if (res.data) {
					setMeals(res.data.data.meals);
				}
				setLoading(false);
			})
			.catch(err => {
				console.log(err.response.data);
				setLoading(false);
			});
	}, []);

	return (
		<main className='main'>
			<section className='section'>
				{loading ? (
					<motion.i
						animate={{ rotate: [0, 360], transition: { repeat: Infinity } }}
						className='lni lni-spinner-solid spinner'
					></motion.i>
				) : (
					<>
						{meals.length === 0 ? (
							<p className='text--center'>There are no meals to display.</p>
						) : (
							<>
								<motion.div
									variants={containerVariants}
									initial='hidden'
									animate='visible'
									className='container'
								>
									{meals.map(meal => (
										<Card
											key={meal.id}
											image={meal.strMealThumb}
											title={meal.title}
											subTitle={meal.strMeal}
											description={meal.description}
											price={meal.price}
											rating={meal.ratings}
										/>
									))}
								</motion.div>

								<button className='btn btn--primary'>Learn More</button>
							</>
						)}
					</>
				)}
			</section>
		</main>
	);
}

export default App;
