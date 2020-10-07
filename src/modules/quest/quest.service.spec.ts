import { QuestService } from './quest.service';
import { createConnection, Connection } from 'typeorm';
import { dbConfig } from '../../db.config';
import { Quest } from '../../entity/Quest';

describe('quest.service', () => {
  let connection: Connection;
  let questService: QuestService;
  const questDummy = {
    name: 'Issei',
  };

  beforeAll(async () => {
    connection = await createConnection(dbConfig);
    questService = new QuestService(connection.getRepository(Quest));
  });

  beforeEach(async () => {
    await connection.synchronize(true);
    await connection.runMigrations();
  });

  afterAll(async () => {
    await Promise.all([connection.close()]);
  });

  it('should get quest', async () => {
    const quest = new Quest('Issei');
    await connection.getRepository(Quest).save(quest);
    const found = await questService.findAll();

    expect(found[0].id).toBe(quest.id);
    expect(found[0].name).toBe(quest.name);
  });

  it('should create for quest', async () => {
    await questService.create(questDummy);
    const quest = await questService.findAll();
    expect(quest).toHaveLength(1);
  });

  it('should update for quest', async () => {
    const created = await questService.create(questDummy);
    const updated = await questService.update(created.id, {
      name: 'Miyuki',
    });
    expect(updated.name).toEqual('Miyuki');
  });

  it('should delete for quest', async () => {
    const created = await questService.create(questDummy);
    const deleted = await questService.delete(created.id!);
    expect(deleted).toBe(undefined);
  });
});
