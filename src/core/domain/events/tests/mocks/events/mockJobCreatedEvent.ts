
import { IDomainEvent } from "../../../IDomainEvent";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";

export class MockJobCreatedEvent implements IDomainEvent {
  dateTimeOccurred: Date;
  id: UniqueEntityID;

  constructor (id: UniqueEntityID) {
    this.id = id;
    this.dateTimeOccurred = new Date();
  }

  getAggregateId (): UniqueEntityID {
    return this.id;
  }
}