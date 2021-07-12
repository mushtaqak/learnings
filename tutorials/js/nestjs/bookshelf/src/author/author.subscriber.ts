import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Author } from './entities';

@EventSubscriber()
export class AuthorSubscriber implements EntitySubscriberInterface<Author> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Author;
  }

  beforeInsert(event: InsertEvent<Author>) {
    console.log(`BEFORE AUTHOR INSERTED: `, event.entity);
    console.log({ event })
  }

  afterInsert(event: InsertEvent<Author>) {
    console.log(`AFTER AUTHOR INSERTED: `, event.entity);
    console.log({ event })
  }
}
