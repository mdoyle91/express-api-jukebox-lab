const Track = require(`../models/track.js`);
const express = require(`express`);
const router = express.Router();

router.post(`/`, async (req, res) => {
  try {
    const createdTrack = Track.create(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.json({ message: `Create route` });
});

router.get(`/`, async (req, res) => {
  try {
    const foundTracks = await Track.find();
    res.status(200).json(foundTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(`/:trackId`, async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);

    if (!foundTrack) {
      res.status(404);
      throw new Error(`Pet not found.`);
    }

    res.status(200).json(foundTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete(`/:trackId`, async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.trackId);
    res.status(200).json(`${deletedTrack.name} has been deleted.`);

    if (!deletedTrack) {
      res.status(404);
      throw new Error(`Track not found.`);
    }

    res.status(200).json(`${adoptedTrack.name} has been adopted.`);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

router.put(`/:trackId`, async (req, res) => {
  try {
    const updatedPet = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body
    );
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
