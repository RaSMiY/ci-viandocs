import { NgModule } from "@angular/core";
import { ViewAnnotateComponent } from "./view-annotate/view-annotate.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
      {
        path: '',
        component: ViewAnnotateComponent,
    },
];

/**
 * Модуль просмотра документов и добавления анотаций.
 */
@NgModule({
  imports: [
    ViewAnnotateComponent,
    RouterModule.forChild(routes)
],
  exports: [RouterModule],
}) export class ViewAnnotateModule {}