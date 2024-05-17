// sse.service.ts
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseService {
	private readonly eventSubject = new Subject();

	sendEvent(data: any) {
		this.eventSubject.next(data);
	}

	getEvents() {
		return this.eventSubject.asObservable();
	}
}
