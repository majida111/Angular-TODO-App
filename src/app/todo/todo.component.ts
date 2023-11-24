import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component ,OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { Itask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks : Itask[]=[];
  inprogress :Itask[]=[];
  done :Itask[]=[];
  i:number = 0;
  updateIndex!:any;
  isEditEnabled:boolean = false;
  constructor(private fb:FormBuilder){

  }
ngOnInit(): void {
  this.todoForm = this.fb.group({
    item:['', Validators.required]
  });
}
addtask(){
  this.tasks.push({
    description:this.todoForm.value.item,
    done:false
  });
  this.todoForm.reset();
}
deleteTask(i :number) : void {
  this.tasks.splice(i,1);

}
editTask(item:Itask,i :number) : void {
  this.todoForm.controls['item'].setValue(item.description);
  this.tasks[i].done =!this.tasks[i].done;
  this.isEditEnabled= true;
  this.updateIndex = i;
}
deleteInProgressTask(i :number) : void {
  this.inprogress.splice(i,1);

}
updatetask(){
  this.tasks[this.updateIndex].description = this.todoForm.value.item;
  this.tasks[this.updateIndex].done=false;
  this.todoForm.reset();
  this.updateIndex=undefined;
  this.isEditEnabled= false;
}
deleteDoneTask(i :number) : void {
  this.done.splice(i,1);

}
drop(event: CdkDragDrop<Itask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}

