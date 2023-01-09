import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ScriptRecord } from '../entities/script-record.entity';


@Injectable()
export class ScriptCreatedListener {
  @OnEvent('script.created')
  handleScriptCreatedEvent(script: ScriptRecord) {
    // handle and process "ScriptCreatedListener" event
    console.log('handleScriptCreatedEvent: ', script);
  }
}