
import {ChangeDetectionStrategy, Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

/**
 * @title Dialog Animations
 */
@Component({
  selector: 'app-custom-modal',
  styleUrl:'./custom-modal.component.css',
  templateUrl:'./custom-modal.component.html',
  standalone:true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomModalComponent {
  readonly dialog = inject(MatDialog);

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAnimationsExampleDialog {
  // readonly dialogRef = inject(MatDialogRef<DialogAnimationsExampleDialog>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { claimNumber: string, remarks: string },
    private dialogRef: MatDialogRef<DialogAnimationsExampleDialog>
  ) {}
}
