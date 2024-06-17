import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabbedPaneService {
  private _pageCount = signal(0);
  private _currentPage = signal(0);
  public activeTab = computed(() => this.currentPage());
  public pageCount = this._pageCount.asReadonly();
  public currentPage = this._currentPage.asReadonly();

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

    if (currentCount < 0) {
      currentCount = pageCount - 1;
    }

    this.setCurrentPage(currentCount);
  }

  public next() {
    let currentCount: number = this._currentPage();
    const pageCount: number = this._pageCount();
    currentCount++;
    if (currentCount >= pageCount) {
      currentCount = 0;
    }
    this.setCurrentPage(currentCount);
  }
}
