import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabbedPaneService {
  private _activeTab = signal(0);
  private _pageCount = signal(0);
  private _currentPage = signal(1);
  public activeTab = this._activeTab.asReadonly();
  public pageCount = this._pageCount.asReadonly();
  public currentPage = this._currentPage.asReadonly();

  constructor() {
    effect(() => {
      const currentPage = this.currentPage();
      this._activeTab.set(currentPage - 1);
    }, {allowSignalWrites: true});
  }

  public setPageCount(pageCount: number) {
    this._pageCount.set(pageCount);
  }

  public setCurrentPage(page: number): void {
    this._currentPage.set(page);
  }

  public prev() {
    let currentCount: number = this._currentPage();
    const pageCount: number = this._pageCount();
    currentCount--;
    if (currentCount < 1) {
      currentCount = pageCount;
    }
    this.setCurrentPage(currentCount);
  }

  public next() {
    let currentCount: number = this._currentPage();
    const pageCount: number = this._pageCount();
    currentCount++;
    if (currentCount > pageCount) {
      currentCount = 1;
    }
    this.setCurrentPage(currentCount);
  }
}
