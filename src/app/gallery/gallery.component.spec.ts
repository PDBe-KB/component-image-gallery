import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryComponent} from './gallery.component';
import {DownloadComponent} from '../download/download.component';
import {Gallery} from './gallery.models';
import {MatDialog} from '@angular/material/dialog';

const TEST_LIGAND_GALLERY: Gallery = {
  title: 'title',
  help_text: 'help_text',
  div_id: 'div_id',
  gallery_items: [
    {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: [],
      flag: true,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    }
  ]
};

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent, DownloadComponent],
      providers: [
        {provide: MatDialog, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    component.data = TEST_LIGAND_GALLERY;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('interactingCount() should work', () => {
    expect(component.interactingCount()).toEqual('Directly Interacting Ligands (1) - ');
    component.data = {
      title: 'title',
      help_text: 'help_text',
      div_id: 'div_id',
      gallery_items: [
        {
          url: 'gallery_item_url',
          alt_text: 'alt_text',
          label: 'label',
          sub_label: 1,
          id_code: 'id_code',
          elements: [
            {label: 'element_label', url: 'element_url'}
          ],
          target_url: 'target_url',
          categories: [],
          related_entries: [],
          flag: false,
          buttons: [
            {
              class: '',
              text: '',
              target_url: ''
            }
          ]
        }
      ]
    };
    expect(component.interactingCount()).toEqual('');
    component.hasFlags = false;
    expect(component.interactingCount()).toEqual('');
  });

  it('showAll() should work', () => {
    component.showLimit = 0;
    component.showAll();
    expect(component.showLimit).toEqual(1);
  });

  it('showLess() should work', () => {
    component.showLimit = 12;
    component.showLess();
    expect(component.showLimit).toEqual(6);
  });

  it('triggerFlag() should work', () => {
    component.showFlaggedOnly = true;
    component.triggerFlag();
    expect(component.showFlaggedOnly).toBeFalsy();
    component.triggerFlag();
    expect(component.showFlaggedOnly).toBeTruthy();
  });

  it('getDownloadModalData() should work', () => {
    component.downloadModalData = {};
    component.getDownloadModalData('type', 'accession', ['foo1-42', 'foo2-42']);
    const expected = {
      accession: 'accession',
      listPdbIds: ['foo1', 'foo2'],
      relationship: 'type'
    };
    expect(component.downloadModalData['accession']).toEqual(expected);
  });

  it('checkShowLimit() should work', () => {
    component.showLimit = 5;
    expect(component.checkShowLimit(4)).toBeTruthy();
    expect(component.checkShowLimit(6)).toBeFalsy();
    expect(component.checkShowLimit(5)).toBeFalsy();
  });

  it('setSearchTerm() should work', () => {
    const e = {
      srcElement: {
        value: 'foo'
      }
    };
    component.setSearchTerm(e);
    expect(component.searchTerm).toBe('foo');
  });

  it('filterByFlag() should work', () => {
    const mockGalleryItem = {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: [],
      flag: false,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    };
    component.hasFlags = true;
    component.showFlaggedOnly = true;
    expect(component.filterByFlag(mockGalleryItem)).toEqual(false);
    component.showFlaggedOnly = false;
    expect(component.filterByFlag(mockGalleryItem)).toEqual(true);
    component.hasFlags = false;
    expect(component.filterByFlag(mockGalleryItem)).toEqual(true);
  });

  it('filterBySearchTerm() should work', () => {
    const mockGalleryItem = {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: ['foo', 'bar'],
      flag: true,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    };
    component.showLimit = 10;
    /**
     * If there is no search term, the full list should be shown
     */
    component.searchTerm = '';
    expect(component.filterBySearchTerm(mockGalleryItem));
    component.searchTerm = undefined;
    expect(component.filterBySearchTerm(mockGalleryItem));
    expect(component.showLimit).toBe(10);
    /**
     * If there is a found search term, filter the data
     */
    component.searchTerm = 'label';
    expect(component.filterBySearchTerm(mockGalleryItem));
    expect(component.showLimit).toBe(1);
    component.searchTerm = 'foo';
    expect(component.filterBySearchTerm(mockGalleryItem));
    expect(component.showLimit).toBe(1);
    /**
     * If there is search term is not found, don't filter the data
     */
    component.searchTerm = 'asd';
    expect(!component.filterBySearchTerm(mockGalleryItem));
    expect(component.showLimit).toBe(6);
  });

  it('checkPdb() should work', () => {
    let item = {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: [],
      flag: true,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    };
    expect(component.checkPdb(item)).toBeFalsy();
    item = {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: ['1foo', '2foo'],
      flag: true,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    };
    expect(component.checkPdb(item)).toBeTruthy();
  });

  it('checkIfImportant() should work', () => {
    const mockGalleryItem = {
      url: 'gallery_item_url',
      alt_text: 'alt_text',
      label: 'label',
      sub_label: 1,
      id_code: 'id_code',
      elements: [
        {label: 'element_label', url: 'element_url'}
      ],
      target_url: 'target_url',
      categories: [],
      related_entries: [],
      flag: true,
      buttons: [
        {
          class: '',
          text: '',
          target_url: ''
        }
      ]
    };
    // If not cofactor-like
    expect(component.checkIfImportant(mockGalleryItem)).toEqual({padding: '2px'});
    // If cofactor-like
    mockGalleryItem.categories = ['cofactor-like'];
    expect(component.checkIfImportant(mockGalleryItem)).toEqual({border: 'solid 3px rgb(116,179,96)'});
  });

  it('openMolstarDialog() should work', () => {
    // Set parameters for opening a Mol* dialog

    // If there are ligands in data.ligandGallery
    const expected = {
      entryList: [
        {
          pdbId: '1foo',
          assemblyId: 'preferred',
          entityId: '1',
          entityColor: [50, 130, 255],
          ligandId: 'STI'
        }
      ],
      current: 0
    };
    component.dialog.open = function () {
      return null;
    };
    component.data.ligandGallery = true;
    component.filteredData = [
      {
        'related_entries': [
          '1foo_1'
        ],
        'id_code': 'STI'
      }
    ];
    expect(component.openMolstarDialog(0)).toEqual(expected);

    // If there are no ligands in data.ligandGallery
    component.data.ligandGallery = false;
    const expectedNoLigand = {
      entryList: [
        {
          pdbId: '1foo',
          assemblyId: 'preferred',
          entityId: '1',
          entityColor: [50, 130, 255]
        }
      ],
      current: 0
    };
    expect(component.openMolstarDialog(0)).toEqual(expectedNoLigand);

  });

});
