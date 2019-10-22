import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;

  constructor(private _projectService: ProjectService) { 
    this.title = "Crear Proyecto";
    this.project = new Project('','','','',2019,'','');
  }

  ngOnInit() {
  }

  onSubmit(form){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      response => {
        console.log(response);
        if(response.project){
          this.status = 'success';
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
