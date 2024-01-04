import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { t } from "i18next";

const AntiDiscriminationPoliciesTab = () => {
  return (
    <Card>
      <CardHeader className="p-6">
        <h6 className="font-bolder">
          {t("AntiDiscriminationPoliciesTab.AntiDiscriminationPolicies")}
        </h6>
      </CardHeader>
      <CardBody
        className="text-black pt-3 h-lg-calc overflow-auto"
        style={{ ["--x-h-lg"]: "287.4px" }}
      >
        <div className="multi-col-content">
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur. Faucibus ultrices vitae cras
            eu interdum tortor semper pulvinar urna. Ipsum amet et fringilla vel
            vel turpis. Ut sed at arcu enim a. Nisi sollicitudin non cursus
            sapien pellentesque etiam in ullamcorper. Sit et nunc ullamcorper
            bibendum vitae. Sit aliquet nunc diam sagittis tellus sit. Porttitor
            morbi tellus viverra auctor mauris eu. Nam fames in laoreet risus
            accumsan sagittis dolor sed.
          </p>
          <p className="mb-4">
            Enim ut ut vitae habitasse. Enim enim augue quis vivamus morbi ut.
            In non morbi arcu sit. At nisl neque pretium auctor aliquam ut ac
            vitae. Ac malesuada pellentesque consequat scelerisque consectetur
            sagittis elit. Lacinia interdum accumsan commodo faucibus. Fames
            nunc lobortis dolor aliquam. Et justo faucibus eget sagittis sit
            pretium viverra mauris. Non varius volutpat pellentesque erat
            posuere cras aliquam. Montes gravida faucibus porttitor mattis. At
            convallis pulvinar quis et. Tristique tellus praesent commodo
            malesuada eget varius purus odio tincidunt. At magnis lectus
            habitasse adipiscing pharetra lacus sit. Vulputate donec massa
            sagittis velit venenatis. Lacinia dui consequat blandit faucibus
            aenean.
          </p>
          <p className="mb-4">
            Commodo auctor sagittis tincidunt id. Arcu sodales mauris at tellus
            lacus rhoncus. Vitae dui ut senectus adipiscing vivamus. Ut nunc
            eget ut curabitur tempor semper. Nunc lacinia ultrices odio
            placerat. Laoreet hac vitae orci egestas nullam in. In tortor neque
            lectus lectus. Sed elementum venenatis vel arcu. Orci in viverra
            maecenas volutpat lectus elit nunc sagittis. Mauris hac nulla
            sollicitudin ut tortor metus diam tortor. Eu amet nisl auctor
            ornare. Purus fermentum pulvinar praesent rhoncus mauris pharetra
            euismod aliquam accumsan. Risus hac mus eros eget ac fermentum.
            Praesent tortor integer egestas nisi ut sed eu velit. Nullam
            faucibus tellus cursus ut tellus elementum.
          </p>
          <p className="mb-4">
            Mi rhoncus bibendum dolor libero dui arcu. Libero in netus egestas
            aliquam tincidunt mauris. Orci euismod orci sit risus id nunc elit
            amet vel. Lacus egestas lorem egestas sit nulla in semper ultrices
            praesent.
          </p>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur. Faucibus ultrices vitae cras
            eu interdum tortor semper pulvinar urna. Ipsum amet et fringilla vel
            vel turpis. Ut sed at arcu enim a. Nisi sollicitudin non cursus
            sapien pellentesque etiam in ullamcorper. Sit et nunc ullamcorper
            bibendum vitae. Sit aliquet nunc diam sagittis tellus sit. Porttitor
            morbi tellus viverra auctor mauris eu. Nam fames in laoreet risus
            accumsan sagittis dolor sed. Enim ut ut vitae habitasse. Enim enim
            augue quis vivamus morbi ut. In non morbi arcu sit. At nisl neque
            pretium auctor aliquam ut ac vitae. Ac malesuada pellentesque
            consequat scelerisque consectetur sagittis elit. Lacinia interdum
            accumsan commodo faucibus. Fames nunc lobortis dolor aliquam. Et
            justo faucibus eget sagittis sit pretium viverra mauris.
          </p>
          <p className="mb-4">
            Non varius volutpat pellentesque erat posuere cras aliquam. Montes
            gravida faucibus porttitor mattis. At convallis pulvinar quis et.
            Tristique tellus praesent commodo malesuada eget varius purus odio
            tincidunt. At magnis lectus habitasse adipiscing pharetra lacus sit.
            Vulputate donec massa sagittis velit venenatis. Lacinia dui
            consequat blandit faucibus aenean. Arcu sodales mauris at tellus
            lacus rhoncus. Vitae dui ut senectus adipiscing vivamus. Ut nunc
            eget ut curabitur tempor semper. Nunc lacinia ultrices odio
            placerat. Laoreet hac vitae orci egestas nullam in. In tortor neque
            lectus lectus. Sed elementum venenatis vel arcu. Orci in viverra
            maecenas volutpat lectus elit nunc sagittis. Mauris hac nulla
            sollicitudin ut tortor metus diam tortor. Eu amet nisl auctor
            ornare. Purus fermentum pulvinar praesent rhoncus mauris pharetra
            euismod aliquam accumsan. Risus hac mus eros eget ac fermentum.
            Praesent tortor integer egestas nisi ut sed eu velit. Nullam
            faucibus tellus cursus ut tellus elementum.
          </p>
          <p className="mb-4">
            Mi rhoncus bibendum dolor libero dui arcu. Libero in netus egestas
            aliquam tincidunt mauris. Orci euismod orci sit risus id nunc elit
            amet vel. Lacus egestas lorem egestas sit nulla in semper ultrices
            praesent. Risus mi tellus tortor massa egestas mollis elit potenti
            cras. Facilisis tellus lacinia tincidunt vel vitae tortor varius
            felis eget.
          </p>
        </div>
      </CardBody>
      <CardFooter
        className="border-top border-light-blue-c p-6"
        style={{ minHeight: "72px" }}
      ></CardFooter>
    </Card>
  );
};

export default AntiDiscriminationPoliciesTab;
