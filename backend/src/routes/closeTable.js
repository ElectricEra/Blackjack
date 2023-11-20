import { gameManager } from '../gameManager.js';

export const closeTable = (req, res) => {
  try {
    gameManager.closeTable(req?.body?.gameId);

    res.sendStatus(200);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
