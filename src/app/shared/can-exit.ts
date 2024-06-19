import { Observable } from 'rxjs';

export abstract class CanExit {
  abstract canExit(): Observable<boolean>;
}
