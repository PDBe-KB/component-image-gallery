import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Gallery, GalleryItem} from './gallery.models';
import {MatDialog} from '@angular/material';
import {MolstarDialogComponent} from '../molstar-dialog/molstar-dialog.component';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {

  @Input() data: Gallery;
  searchTerm: string;
  showLimit: number;
  showFlaggedOnly: boolean;
  hasFlags: boolean;
  filteredData: any[];
  filterTextChanged = new Subject<string>();
  downloadModalData: any;

  constructor(public dialog: MatDialog) {
    this.showLimit = 6;
    this.searchTerm = '';
    this.showFlaggedOnly = true;
    this.hasFlags = false;
    this.downloadModalData = {};
  }

  ngOnInit() {
    this.checkHasFlag();
    this.filterGalleryData();

    // Observable to debounce key press event
    this.filterTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((textValue) => this.filterGalleryData());

  }

  showAll() {
    this.showLimit = this.data.gallery_items.length;
  }

  showLess() {
    this.showLimit = 6;
  }

  triggerFlag() {
    this.showFlaggedOnly = !this.showFlaggedOnly;
    this.filterGalleryData();
    this.showAll();
  }

  checkHasFlag() {
    for (let i = 0; i < this.data.gallery_items.length; i++) {
      if (this.data.gallery_items[i].flag) {
        this.hasFlags = true;
        break;
      }
    }
    return this.hasFlags;
  }

  checkShowLimit(i: number) {
    return i < this.showLimit;
  }

  setSearchTerm(e: any) {
    this.filterTextChanged.next(e.srcElement.value);
    this.searchTerm = e.srcElement.value;
  }

  filterGalleryData() {
    const tempFilteredData = [];
    for (let i = 0; i < this.data.gallery_items.length; i++) {

      // for app-download
      this.data.gallery_items[i]['div_id'] = this.data['div_id'];
      this.getDownloadModalData(
        this.data['div_id'], this.data.gallery_items[i]['id_code'],
        this.data.gallery_items[i]['related_entries']);

      if (this.filterByFlag(this.data.gallery_items[i]) && this.filterBySearchTerm(this.data.gallery_items[i])) {
        tempFilteredData.push(this.data.gallery_items[i]);
      }
    }
    this.filteredData = tempFilteredData.slice();

  }

  getDownloadModalData(type: string, accession: string, listdata: any): void {
    const listPdbIds = [];
    for (const j of listdata) {
      const pdb_id = j.substr(0, 4);
      if (listPdbIds.indexOf(pdb_id) === -1) {
        listPdbIds.push(pdb_id);
      }
    }
    this.downloadModalData[accession] = {
      'accession': accession,
      'listPdbIds': listPdbIds,
      'relationship': type
    };
  }

  interactingCount(): string {
    let count = 0;
    if (this.hasFlags) {
      for (let i = 0; i < this.data.gallery_items.length; i++) {
        if (this.data.gallery_items[i].flag) {
          count++;
        }
      }
    }
    if (count > 0) {
      return 'Directly Interacting Ligands (' + count + ') - ';
    }
    return '';
  }

  filterByFlag(item: GalleryItem) {
    if (this.hasFlags) {
      if (this.showFlaggedOnly) {
        return item.flag;
      }
      return true;
    } else {
      return true;
    }
  }

  filterBySearchTerm(item: GalleryItem) {
    if (this.searchTerm && this.searchTerm !== '') {
      if (item.label.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1
        || item.id_code.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1) {
        this.showLimit = this.data.gallery_items.length;
        return true;
      } else if (this.checkPdb(item)) {
        this.showLimit = this.data.gallery_items.length;
        return true;
      } else {
        this.showLimit = 6;
        return false;
      }
    } else {
      return true;
    }
  }

  checkPdb(item: GalleryItem): boolean {
    for (let i = 0; i < item.related_entries.length; i++) {
      if (item.related_entries[i].indexOf(this.searchTerm) !== -1) {
        return true;
      }
    }
    return false;
  }

  checkIfImportant(galleryItem: GalleryItem) {
    if (galleryItem.categories.length > 0 && galleryItem.categories.indexOf('cofactor-like') > -1) {
      return {
        'border': 'solid 3px rgb(116,179,96)'
      };
    } else {
      return {
        'padding': '2px'
      };
    }
  }

  checkIfSelf(item: any) {
    return item.id_code.indexOf('(self)') <= -1;
  }

  openMolstarDialog(selectedIndex) {
    const entries = [];
    let isLigand = false;
    if (this.data.ligandGallery) {
      isLigand = true;
    }

    this.filteredData[selectedIndex].related_entries.forEach(rec => {
      const ids = rec.split('_');
      const molstarData = {pdbId: ids[0], assemblyId: 'preferred', entityId: ids[1], entityColor: [50, 130, 255]};
      if (isLigand) {
        molstarData['ligandId'] = this.filteredData[selectedIndex].id_code;
      }
      entries.push(molstarData);
    });

    const entryData = {
      entryList: entries,
      current: 0
    };

    this.dialog.open(MolstarDialogComponent,
      {
        disableClose: false,
        panelClass: 'molstarDialog',
        data: entryData
      }
    );

    return entryData;
  }

  ngOnDestroy() {
    this.filterTextChanged.unsubscribe();
  }

}
