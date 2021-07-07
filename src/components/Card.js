import { motion } from "framer-motion";

const cardVariants = {
	hidden: { sacle: 1, opacity: 0, y: "10rem" },
	visible: { scale: 1, opacity: 1, y: 0 }
};

const Card = ({ image, title, subTitle, description, price, rating }) => {
	const getStars = num => {
		const array = [];

		for (let i = 0; i < num; i++) {
			array.push(i);
		}

		return array.map(star => (
			<i key={star} className='lni lni-star-filled card__star'></i>
		));
	};

	return (
		<motion.div variants={cardVariants} className='card'>
			<figure className='card__image-container'>
				<img className='card__image' alt={title} src={image} />
			</figure>

			<div className='card__content'>
				<div className='card__title-container'>
					<div className='card__title'>
						<h3 className='card__heading'>{title}</h3>
						<span className='card__sub-heading'>{subTitle}</span>
					</div>
					<h3 className='card__heading'>{price}</h3>
				</div>

				<p className='cad__description'>{`${description
					.split(" ")
					.splice(0, 15)
					.join(" ")}...`}</p>
			</div>

			<div className='card__actions'>
				<div className='card__rating'>{getStars(rating)}</div>

				<button className='card__btn'>
					<i className='lni lni-plus'></i>
				</button>
			</div>
		</motion.div>
	);
};
export default Card;
