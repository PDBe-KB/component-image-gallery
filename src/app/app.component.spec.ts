import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GalleryComponent} from './gallery/gallery.component';
import {DownloadComponent} from './download/download.component';
import {MatDialogModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GalleryComponent,
        DownloadComponent
      ],
      imports: [
        MatDialogModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
