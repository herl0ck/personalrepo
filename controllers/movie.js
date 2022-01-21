const Movie = require('../models/movie');
const model = require('../model/movie')

exports.getAllMovies = async (req, res, next) => {
    try {
        const movie = await Movie.find().limit(20);

        if (!movie) {
            res.status(404).json({message: 'Data movie not found!'});     
        }

        res.status(200).json({message: 'Data movie found!', movie: movie });
    } catch (error) {
        throw error;
    }
};

exports.getMoviesById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const movies = await Movie.findOne({movie_id: id });
        
        if (!movie) {
            res.status(404).json({message: 'Data movie not found!'});     
        }

        res.status(200).json({message: 'Data movie found!', movie: movie });
    } catch (error) {
        throw error;
    }
}

exports.getRecommendation = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (Number(userId) > 943 || Number(userId) < 0) {
            res
                .status(500)
                .json({message: 'User id gaboleh lebih dari 943 atau kurang dari 0' });
        }

        const recommendation = model.recommend(userId);

        if (!recommendation) {
            res.status(404).json({message: 'Recommendation ga ketemu!' });
        }

        res
            .status(200)
            .json({
                message: 'Recommendation ketemu!',
                recommendation: recommendation,
            });

    } catch (error) {
        throw error;
    }
}